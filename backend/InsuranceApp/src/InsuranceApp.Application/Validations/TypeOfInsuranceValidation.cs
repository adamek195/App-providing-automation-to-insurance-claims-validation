using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Validations
{
    class TypeOfInsuranceValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var typeOfInsurance = value as string;
            var isValid = true;

            if(typeOfInsurance != "OC" && typeOfInsurance != "AC")
            {
                isValid = false;
                return isValid;
            }

            return isValid;
        }
    }
}
