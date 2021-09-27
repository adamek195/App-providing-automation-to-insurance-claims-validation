using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IPoliciesService
    {
        Task<List<PolicyDto>> GetUserPolicies(string userId);
        Task<PolicyDto> CreatePolicy(RequestPolicyDto newPolicyDto, string userId);
        Task DeletePolicy(int policyId, string userId);
        Task UpdatePolicy(int policyId, string userId, RequestPolicyDto updatedPolicyDto);
    }
}
