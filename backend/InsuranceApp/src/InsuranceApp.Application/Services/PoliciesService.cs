using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Exceptions;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
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
            var policies = await _policiesRepository.GetUserPolicies(Guid.Parse(userId));

            return _mapper.Map<List<PolicyDto>>(policies);
        }

        public async Task<PolicyDto> GetUserPolicy(int policyId, string userId)
        {
            var policy = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policy == null)
                throw new NotFoundException("Policy with this id does not exist.");

            return _mapper.Map<PolicyDto>(policy);
        }

        public async Task<PolicyDto> CreatePolicy(RequestPolicyDto newPolicyDto, string userId)
        {
            var policyToAdd = _mapper.Map<Policy>(newPolicyDto);
            policyToAdd.UserId = Guid.Parse(userId);

            var checkPolicy = await _policiesRepository.GetUserPolicyByPolicyNumber(policyToAdd.PolicyNumber);
            if (checkPolicy != null)
                throw new ConflictException("Policy with the same number already exist");

            await _policiesRepository.AddPolicy(policyToAdd);

            return _mapper.Map<PolicyDto>(policyToAdd);
        }

        public async Task DeletePolicy(int policyId, string userId)
        {
            var policyToDelete = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyToDelete == null)
                throw new NotFoundException("Policy with this id does not exist.");

            await _policiesRepository.DeletePolicy(policyId, Guid.Parse(userId));
        }

        public async Task UpdatePolicy(int policyId, string userId, RequestPolicyDto updatedPolicyDto)
        {
            var policyToUpdate = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyToUpdate == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var checkPolicy = await _policiesRepository.GetUserPolicyByPolicyNumber(updatedPolicyDto.PolicyNumber);
            if (checkPolicy != null && checkPolicy.Id != policyToUpdate?.Id)
                throw new ConflictException("Policy with the same number already exist");

            policyToUpdate = _mapper.Map<Policy>(updatedPolicyDto);
            policyToUpdate.UserId = Guid.Parse(userId);

            await _policiesRepository.UpdatePolicy(policyId, policyToUpdate);
        }
    }
}
