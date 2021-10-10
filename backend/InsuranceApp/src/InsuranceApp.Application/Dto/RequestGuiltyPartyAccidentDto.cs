﻿using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceApp.Application.Dto
{
    public class RequestGuiltyPartyAccidentDto
    {
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The accident date is required.")]
        public DateTime AccidentDateTime { get; set; }

        [Required(ErrorMessage = "A description of the accident is required.")]
        public string AccidentDescription { get; set; }

        public string GuiltyPartyPolicyNumber { get; set; }
        public string GuiltyPartyRegistrationNumber { get; set; }
    }
}
