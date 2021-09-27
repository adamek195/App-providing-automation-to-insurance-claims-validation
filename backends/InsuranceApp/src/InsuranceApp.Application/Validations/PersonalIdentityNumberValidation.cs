using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Validations
{
    public class PersonalIdentityNumberValidation: ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var personalIdentityNumber = value as string;
            var isValid = true;

            if(personalIdentityNumber.Length != 11)
            {
                isValid = false;
                return isValid;
            }

            foreach( char number in personalIdentityNumber)
            {
                if (number < '0' || number > '9')
                {
                    isValid = false;
                    return isValid;
                }
            }

            return isValid;
        }
    }
}
