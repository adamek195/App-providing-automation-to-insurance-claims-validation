using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Helpers;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.Application.Dto;

namespace InsuranceApp.WebApi.Controllers
{   
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccidentsController : ControllerBase
    {
        private readonly IAccidentsService _accidentsService;

        public AccidentsController(IAccidentsService accidentsService)
        {
            _accidentsService = accidentsService;
        }

        [HttpGet("{policyId}")]
        public async Task<IActionResult> GetAccidents([FromRoute] int policyId)
        {
            var accidents = await _accidentsService.GetAccidents(policyId, User.GetId());

            return Ok(accidents);
        }

        [HttpPost("{policyId}")]
        public async Task<IActionResult> CreateAccident([FromForm] RequestAccidentDto requestAccidentDto,
            [FromForm] AccidentImageDto accidentImageDto, [FromRoute] int policyId)
        {
            var newAccident = await _accidentsService.CreateAccident(policyId, User.GetId(), requestAccidentDto, accidentImageDto);

            return Created($"api/policies/{newAccident.Id}", newAccident);
        }

    }
}
