using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.WebApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GuiltyPartyAccidentsController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IGuiltyPartyAccidentsService _guiltyPartyAccidentsService;
        private readonly ICarDamageDetectionService _carDamageDetectionService;

        public GuiltyPartyAccidentsController(IGuiltyPartyAccidentsService guiltyPartyAccidentsService, ICarDamageDetectionService carDamageDetectionService,
            IUsersService usersService)
        {
            _guiltyPartyAccidentsService = guiltyPartyAccidentsService;
            _carDamageDetectionService = carDamageDetectionService;
            _usersService = usersService;
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

        [HttpPost("{accidentId}/Documents")]
        public async Task<IActionResult> CreateGuiltyPartyAccidentDocument([FromRoute] int accidentId)
        {
            var user = await _usersService.GetUser(User.GetId());

            using (PdfDocument document = new PdfDocument())
            {
                PdfPage page = document.AddPage();

                XGraphics gfx = XGraphics.FromPdfPage(page);

                gfx.DrawString("Zgłoszenie szkody samochodowej", new XFont("Arial", 30, XFontStyle.Bold), XBrushes.Black, new XPoint(65, 70));

                gfx.DrawString($"Użytkownik: {user.FirstName} {user.LastName}", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 150));

                var stream = new MemoryStream();

                document.Save(stream);
                stream.Seek(0, SeekOrigin.Begin);

                return new FileStreamResult(stream, "application/x-download") { FileDownloadName = $"szkoda.pdf" };

            }
        }
    }
}
