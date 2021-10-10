using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Dto
{
    public class GuiltyPartyAccidentDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime AccidentDateTime { get; set; }
        public string AccidentDescription { get; set; }
        public string GuiltyPartyPolicyNumber { get; set; }
        public string GuiltyPartyRegistrationNumber { get; set; }
    }
}
