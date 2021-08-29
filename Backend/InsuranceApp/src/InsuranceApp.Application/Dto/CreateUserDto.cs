using InsuranceApp.Application.Validations;
using System.ComponentModel.DataAnnotations;


namespace InsuranceApp.Application.Dto
{
    public class CreateUserDto
    {
        [Required(ErrorMessage = "First Name of the user is required.")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name of the user is required.")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string LastName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email of the user is required.")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Personal Identity Number of the user is required.")]
        [PersonalIdentityNumberValidation(ErrorMessage = "Wrong Personal Identity Number.")]
        public string PersonalIdentitynumber { get; set; }

        [Required(ErrorMessage = "Phone Number of the user is required.")]
        [PhoneNumberValidation(ErrorMessage = "Wrong Phone Number.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Name of the City of the user is required.")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string City { get; set; }

        [Required(ErrorMessage = "Postal Code of the user is required.")]
        [PostalCodeValidation(ErrorMessage = "Wrong Postal Code number.")]
        public string PostalCode { get; set; }

        [Required(ErrorMessage = "Address of the user is required.")]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Address { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
