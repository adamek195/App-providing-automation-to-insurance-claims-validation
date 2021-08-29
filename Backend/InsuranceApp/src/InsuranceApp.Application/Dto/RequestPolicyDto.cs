using InsuranceApp.Application.Validations;
using System.ComponentModel.DataAnnotations;
using System;

namespace InsuranceApp.Application.Dto
{
    public class RequestPolicyDto
    {
        [Required(ErrorMessage = "Policy Number is required.")]
        public string PolicyNumber { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The creation date of the policy is required.")]
        public DateTime PolicyCreationDate { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Expire date of the policy is required.")]
        public DateTime PolicyExpireDate { get; set; }

        [Required(ErrorMessage = "The name of an insurance company is required.")]
        public string Company { get; set; }

        [Required(ErrorMessage = "The type of an car insurance is required (OC/AC).")]
        [TypeOfInsuranceValidation(ErrorMessage = "The type of insurance must be OC or AC")]
        public string TypeOfInsurance { get; set; }

        [Required(ErrorMessage = "The Registration Number of the car is required.")]
        public string RegistrationNumber { get; set; }

        [Required(ErrorMessage = "The Mark of the car is required.")]
        public string Mark { get; set; }

        [Required(ErrorMessage = "The Model of the car is required.")]
        public string Model { get; set; }
    }
}
