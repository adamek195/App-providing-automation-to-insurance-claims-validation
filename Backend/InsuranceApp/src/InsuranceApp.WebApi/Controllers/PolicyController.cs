using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PolicyController : ControllerBase
    {
        private readonly IPoliciesService _policiesService;

        public PolicyController(IPoliciesService policiesService)
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
        public async Task<IActionResult> CreatePolicy(CreatePolicyDto newPolicyDto)
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
    }
}
