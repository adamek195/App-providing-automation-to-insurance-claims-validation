using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.WebApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PoliciesController : ControllerBase
    {
        private readonly IPoliciesService _policiesService;

        public PoliciesController(IPoliciesService policiesService)
        {
            _policiesService = policiesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserPolicies()
        {
            var userPolicies = await _policiesService.GetUserPolicies(User.GetId());

            return Ok(userPolicies);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePolicy(RequestPolicyDto newPolicyDto)
        {
            var newPolicy = await _policiesService.CreatePolicy(newPolicyDto, User.GetId());

            return Created($"api/policies/{newPolicy.Id}", newPolicy);
        }

        [HttpDelete("{policyId}")]
        public async Task<IActionResult> DeletePolicy([FromRoute]int policyId)
        {
            await _policiesService.DeletePolicy(policyId, User.GetId());

            return NoContent();
        }

        [HttpPut("{policyId}")]
        public async Task<IActionResult> UpdatePolicy([FromRoute] int policyId, RequestPolicyDto updatedPolicyDto)
        {
            await _policiesService.UpdatePolicy(policyId, User.GetId(), updatedPolicyDto);

            return NoContent();
        }
    }
}
