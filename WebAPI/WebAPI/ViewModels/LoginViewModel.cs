using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(20, 
            ErrorMessage = "The {0} must be at least {2} and at most {1} characters long",
            MinimumLength = 8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
