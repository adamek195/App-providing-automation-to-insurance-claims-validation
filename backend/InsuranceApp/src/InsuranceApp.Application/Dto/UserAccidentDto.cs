using System;

namespace InsuranceApp.Application.Dto
{
    public class UserAccidentDto
    {
        public int Id { get; set; }
        public int PolicyId { get; set; }
        public DateTime AccidentDateTime { get; set; }
        public string AccidentDescription { get; set; }
        public string VictimRegistrationNumber { get; set; }
        public string VictimFirstName { get; set; }
        public string VictimLastName { get; set; }
    }
}
