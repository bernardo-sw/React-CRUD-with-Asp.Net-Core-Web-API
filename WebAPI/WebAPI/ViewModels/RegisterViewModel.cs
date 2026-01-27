using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModels
{
    public class RegisterViewModel
    {   
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [StringLength(20,
            ErrorMessage = "The {0} must be at least {2} and at most {1} characters long",
            MinimumLength = 8)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Passwords don't match")]
        public string ConfirmPassword { get; set; }
    }
}
