using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Dto
{
    public class PolicyDto
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string PolicyNumber { get; set; }
        public DateTime PolicyCreationDate { get; set; }
        public DateTime PolicyExpireDate { get; set; }
        public string Company { get; set; }
        public string TypeOfInsurance { get; set; }
        public string RegistrationNumber { get; set; }
        public string Mark { get; set; }
        public string Model { get; set; }
    }
}
