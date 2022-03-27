using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System;

namespace InsuranceApp.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalIdentitynumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Policy> Policies { get; set; }
        public virtual ICollection<GuiltyPartyAccident> GuiltyPartyAccidents { get; set; }
    }
}
