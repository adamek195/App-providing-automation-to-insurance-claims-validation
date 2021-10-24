using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsuranceApp.Domain.Entities
{
    public class UserAccident
    {
        [Key]
        public int Id { get; set; }

        public int PolicyId { get; set; }

        [ForeignKey("PolicyId")]
        public virtual Policy Policy { get; set; }

        public DateTime AccidentDateTime { get; set; }
        public string AccidentDescription {get; set;}
        public string VictimRegistrationNumber { get; set; }
        public string VictimFirstName { get; set; }
        public string VictimLastName { get; set; }
        public byte[] AccidentImage { get; set; }
        public bool DamageDetected { get; set; }
    }
}
