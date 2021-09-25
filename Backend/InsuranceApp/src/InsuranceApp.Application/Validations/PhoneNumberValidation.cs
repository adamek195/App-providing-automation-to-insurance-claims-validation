using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Validations
{
    public class PhoneNumberValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var phoneNumber = value as string;
            var isValid = true;

            if (phoneNumber.Length != 9)
            {
                isValid = false;
                return isValid;
            }

            foreach (char number in phoneNumber)
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
