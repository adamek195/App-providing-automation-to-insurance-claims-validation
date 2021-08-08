using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Domain.Entities
{
    public class Accident
    {
        [Key]
        public int Id { get; set; }
        public string TypeOfInsurance { get; set; }
        public DateTime DateTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string RegistrationNumber { get; set; }
        public string InsurancePolicyNumber {get; set;}
    }
}
