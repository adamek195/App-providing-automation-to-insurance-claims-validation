using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsuranceApp.Domain.Entities
{
    public class Policy
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public string PolicyNumber { get; set; }
        public DateTime PolicyCreationDate { get; set; }
        public DateTime PolicyExpireDate { get; set; }
        public string Company { get; set; }
        public string TypeOfInsurance { get; set; }
        public string RegistrationNumber { get; set; }
        public string Mark { get; set; }
        public string Model { get; set; }

        public virtual ICollection<UserAccident> UserAccidents { get; set; }
    }
}
