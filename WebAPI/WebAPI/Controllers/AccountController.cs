using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Services.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthenticate _authencation;

        public AccountController(IConfiguration configuration, IAuthenticate authencation)
        {
            _configuration = configuration ?? 
                throw new ArgumentNullException(nameof(configuration));

            _authencation = authencation ?? 
                throw new ArgumentNullException(nameof(authencation));
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserTokenViewModel>> CreateUser([FromBody] RegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("ConfirmPassword", "Passwords don't match");
                return BadRequest(ModelState);
            }

            var result = await _authencation.RegisterUser(model.Email, model.Password);

            if (result)
            {
                return Ok($"User {model.Email} created successfully.");
            }
            else
            {
                ModelState.AddModelError("CreateUser", "Invalid record");
                return BadRequest(ModelState);
            }
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserTokenViewModel>> Login([FromBody] LoginViewModel model)
        {
            var result = await _authencation.Authenticate(model.Email, model.Password);

            if (result)
            {
                return GenerateToken(model);
            }
            else
            {
                ModelState.AddModelError("LoginUser", "Invalid login");
                return BadRequest(ModelState);
            }
        }

        private ActionResult<UserTokenViewModel> GenerateToken(LoginViewModel model)
        {
            var claims = new[]
            {
                new Claim("email", model.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            // Generating a new key to create the digital signature
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            // Digital signature
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            // Token expiration time
            var expiration = DateTime.UtcNow.AddMinutes(20);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new UserTokenViewModel()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
