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
        public IActionResult CreatePolicy()
        {
            return Ok(User.GetId());
        }
    }
}
