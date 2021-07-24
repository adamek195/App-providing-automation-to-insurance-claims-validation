using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dto
{
    public class CreateUserDto
    {
        [Required(ErrorMessage = "Name of the user is required")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email of the user is required")]
        [EmailAddress]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Email { get; set; }

        [Required(ErrorMessage = "The insurance company of the user is required")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string CompanyName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string PasswordHash { get; set; }
    }
}
