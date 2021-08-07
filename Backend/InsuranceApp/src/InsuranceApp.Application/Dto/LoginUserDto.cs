using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Dto
{
    public class LoginUserDto
    {
        [Required(ErrorMessage = "Name of the user is required")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password of the user is required")]
        [DataType(DataType.Password)]
        public string PasswordHash { get; set; }
    }
}
