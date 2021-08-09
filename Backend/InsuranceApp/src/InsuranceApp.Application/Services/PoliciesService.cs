using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Exceptions;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Services
{
    public class PoliciesService : IPoliciesService
    {
        private readonly IPoliciesRepository _policiesRepository;
        private readonly IMapper _mapper;

        public PoliciesService(IPoliciesRepository policiesRepository, IMapper mapper)
        {
            _policiesRepository = policiesRepository;
            _mapper = mapper;
        }
        public async Task<List<PolicyDto>> GetUserPolicies(string userId)
        {
            var userPolicies = await _policiesRepository.GetUserPolicies(Guid.Parse(userId));
            return _mapper.Map<List<PolicyDto>>(userPolicies);
        }

        public async Task<PolicyDto> CreatePolicy(CreatePolicyDto newPolicyDto, string userId)
        {
            var newPolicy = _mapper.Map<Policy>(newPolicyDto);
            newPolicy.UserId = Guid.Parse(userId);
            await _policiesRepository.AddPolicy(newPolicy);
            return _mapper.Map<PolicyDto>(newPolicy);
        }

        public async Task DeletePolicy(int policyId, string userId)
        {
            var policyToDelete = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyToDelete == null)
                throw new NotFoundException($"Policy of this user with this id: {policyId} does not exist.");

            await _policiesRepository.DeletePolicy(policyId, Guid.Parse(userId));
        }
    }
}
