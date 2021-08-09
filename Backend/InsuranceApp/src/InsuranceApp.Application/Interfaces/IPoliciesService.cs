﻿using InsuranceApp.Application.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IPoliciesService
    {
        Task<List<PolicyDto>> GetUserPolicies(string userId);
        Task<PolicyDto> CreatePolicy(CreatePolicyDto newPolicyDto, string userId);
        Task DeletePolicy(int policyId, string userId);
    }
}