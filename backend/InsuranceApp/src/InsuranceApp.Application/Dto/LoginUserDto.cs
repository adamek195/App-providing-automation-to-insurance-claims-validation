using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Dto
{
    public class LoginUserDto
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email of the user is required")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
