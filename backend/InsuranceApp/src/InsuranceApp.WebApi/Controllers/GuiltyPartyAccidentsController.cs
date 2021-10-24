using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.WebApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InsuranceApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GuiltyPartyAccidentsController : ControllerBase
    {
        private readonly IGuiltyPartyAccidentsService _guiltyPartyAccidentsService;
        private readonly ICarDamageDetectionService _carDamageDetectionService;

        public GuiltyPartyAccidentsController(IGuiltyPartyAccidentsService guiltyPartyAccidentsService, ICarDamageDetectionService carDamageDetectionService)
        {
            _guiltyPartyAccidentsService = guiltyPartyAccidentsService;
            _carDamageDetectionService = carDamageDetectionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGuiltyPartyAccidents()
        {
            var accidents = await _guiltyPartyAccidentsService.GetGuiltyPartyAccidents(User.GetId());

            return Ok(accidents);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGuiltyPartyAccident([FromForm] RequestGuiltyPartyAccidentDto newAccidentDto,
            [FromForm] AccidentImageDto accidentImageDto)
        {
            var damageDetected = await _carDamageDetectionService.DetectCarDamage(accidentImageDto);
            var newAccident = await _guiltyPartyAccidentsService.CreateGuiltyPartyAccident(User.GetId(), newAccidentDto, accidentImageDto, damageDetected);

            return Created($"api/policies/{newAccident.Id}", newAccident);
        }

        [HttpDelete("{accidentId}")]
        public async Task<IActionResult> DeleteGuiltyPartyAccident([FromRoute] int accidentId)
        {
            await _guiltyPartyAccidentsService.DeleteGuiltyPartyAccident(accidentId, User.GetId());

            return NoContent();
        }

        [HttpPut("{accidentId}")]
        public async Task<IActionResult> UpdateGuiltyPartyAccident([FromRoute] int accidentId,
            [FromForm] RequestGuiltyPartyAccidentDto updatedAccidentDto, [FromForm] AccidentImageDto accidentImageDto)
        {
            var damageDetected = await _carDamageDetectionService.DetectCarDamage(accidentImageDto);
            await _guiltyPartyAccidentsService.UpdateGuiltyPartyAccident(accidentId, User.GetId(), updatedAccidentDto, accidentImageDto, damageDetected);

            return NoContent();
        }
    }
}
