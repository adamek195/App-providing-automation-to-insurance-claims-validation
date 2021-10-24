﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsuranceApp.Domain.Entities
{
    public class GuiltyPartyAccident
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public DateTime AccidentDateTime { get; set; }
        public string AccidentDescription { get; set; }
        public string GuiltyPartyPolicyNumber { get; set; }
        public string GuiltyPartyRegistrationNumber { get; set; }
        public byte[] AccidentImage { get; set; }
        public bool DamageDetected { get; set; }
    }
}
