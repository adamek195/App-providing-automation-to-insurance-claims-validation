using Microsoft.AspNetCore.Mvc;
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
    public class UserAccidentsController : ControllerBase
    {
        private readonly IUserAccidentsService _userAccidentsService;

        public UserAccidentsController(IUserAccidentsService userAccidentsService)
        {
            _userAccidentsService = userAccidentsService;
        }

        [HttpGet("{policyId}")]
        public async Task<IActionResult> GetUserAccidents([FromRoute] int policyId)
        {
            var accidents = await _userAccidentsService.GetUserAccidents(policyId, User.GetId());

            return Ok(accidents);
        }

        [HttpPost("{policyId}")]
        public async Task<IActionResult> CreateUserAccident([FromRoute] int policyId, [FromForm] RequestUserAccidentDto newAccidentDto,
            [FromForm] AccidentImageDto accidentImageDto)
        {
            var newAccident = await _userAccidentsService.CreateUserAccident(policyId, User.GetId(), newAccidentDto, accidentImageDto);

            return Created($"api/policies/{newAccident.Id}", newAccident);
        }

        [HttpDelete("{policyId}/{accidentId}")]
        public async Task<IActionResult> DeleteUserAccident([FromRoute] int policyId,[FromRoute] int accidentId)
        {
            await _userAccidentsService.DeleteUserAccident(accidentId, policyId, User.GetId());

            return NoContent();
        }

        [HttpPut("{policyId}/{accidentId}")]
        public async Task<IActionResult> UpdateUserAccident([FromRoute] int policyId, [FromRoute] int accidentId,
            [FromForm] RequestUserAccidentDto updatedAccidentDto, [FromForm] AccidentImageDto accidentImageDto)
        {
            await _userAccidentsService.UpdateUserAccident(accidentId, policyId, User.GetId(), updatedAccidentDto, accidentImageDto);

            return NoContent();
        }
    }
}
