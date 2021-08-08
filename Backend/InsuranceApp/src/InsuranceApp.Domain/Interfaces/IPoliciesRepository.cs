using InsuranceApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IPoliciesRepository
    {
        Task<List<Policy>> GetUserPolicies(Guid userId);
        Task<Policy> AddPolicy(Policy newPolicy);
    }
}
