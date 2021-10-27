using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IPoliciesRepository
    {
        Task<List<Policy>> GetUserPolicies(Guid userId);
        Task<Policy> GetUserPolicy(int policyId, Guid userId);
        Task<Policy> GetUserPolicyByPolicyNumber(string policyNumber);
        Task<Policy> AddPolicy(Policy newPolicy);
        Task DeletePolicy(int policyId, Guid userId);
        Task UpdatePolicy(int policyId, Policy updatedPolicy);
    }
}
