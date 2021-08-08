using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Validations
{
    public class PostalCodeValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var postalCode = value as string;
            var isValid = true;

            if (postalCode.Length != 6)
            {
                isValid = false;
                return isValid;
            }

            if((postalCode[2] != '-'))
            {
                isValid = false;
                return isValid;
            }
            else
            {
                for (int i = 0; i < postalCode.Length; i++)
                {
                    if (postalCode[i] < '0' || postalCode[i] > '9')
                    {
                        if (postalCode[2] == '-')
                            continue;
                        isValid = false;
                        return isValid;
                    }
                }
            }

            return isValid;
        }
    }
}
