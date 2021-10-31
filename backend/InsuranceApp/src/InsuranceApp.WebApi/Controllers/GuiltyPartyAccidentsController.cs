using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.WebApi.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PdfSharpCore.Drawing;
using PdfSharpCore.Drawing.Layout;
using PdfSharpCore.Pdf;
using System.IO;
using System;

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

        public GuiltyPartyAccidentsController(IUsersService usersService, IGuiltyPartyAccidentsService guiltyPartyAccidentsService,
            ICarDamageDetectionService carDamageDetectionService)
        {
            _usersService = usersService;
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

        [HttpPost("{accidentId}/Documents")]
        public async Task<IActionResult> CreateGuiltyPartyAccidentDocument([FromRoute] int accidentId)
        {
            var user = await _usersService.GetUser(User.GetId());
            var accident = await _guiltyPartyAccidentsService.GetGuiltyPartyAccident(accidentId, User.GetId());
            var accidentImage = await _guiltyPartyAccidentsService.GetGuiltyPartyAccidentImage(accidentId, User.GetId());

            using (PdfDocument document = new PdfDocument())
            {
                PdfPage page = document.AddPage();

                XGraphics gfx = XGraphics.FromPdfPage(page);

                gfx.DrawString("Zgłoszenie szkody samochodowej", new XFont("Arial", 30, XFontStyle.Bold), XBrushes.Black, new XPoint(65, 70));
                gfx.DrawString("Rodzaj ubezpieczenia: Ubezpieczenie sprawcy (OC)", new XFont("Arial", 20, XFontStyle.Bold), XBrushes.Black, new XPoint(65, 95));

                gfx.DrawString($"Dane użytkownika", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 140));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 150), new XPoint(550, 150));

                gfx.DrawString($"Użytkownik: {user.FirstName} {user.LastName}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 170));
                gfx.DrawString($"Email: {user.Email}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 185));
                gfx.DrawString($"Pesel: {user.PersonalIdentitynumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 200));
                gfx.DrawString($"Numer telefonu: {user.PhoneNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 215));
                gfx.DrawString($"Miasto: {user.City}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 230));
                gfx.DrawString($"Kod pocztowy: {user.PostalCode}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 245));
                gfx.DrawString($"Adres zamieszkania: {user.Address}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 260));

                gfx.DrawString($"Dane sprawcy", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 290));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 300), new XPoint(550, 300));

                string guiltyPartyPolicyNumber = String.IsNullOrEmpty(accident.GuiltyPartyPolicyNumber) ? "Brak" : accident.GuiltyPartyPolicyNumber;
                gfx.DrawString($"Numer polisy sprawcy: {guiltyPartyPolicyNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 320));
                string guiltyPartyRegistrationNumber = String.IsNullOrEmpty(accident.GuiltyPartyRegistrationNumber) ? "Brak" : accident.GuiltyPartyRegistrationNumber;
                gfx.DrawString($"Numer rejestracyjny pojazdu sprawcy: {guiltyPartyRegistrationNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 335));

                gfx.DrawString($"Zdarzenie", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 365));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 375), new XPoint(550, 375));

                gfx.DrawString($"Data zdarzenia: {accident.AccidentDateTime.Date.ToString("d")}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 395));
                gfx.DrawString($"Opis:",new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 410));
                XRect rectangle = new XRect(50, 420, 500, 50);
                XPen pen = new XPen(XColor.FromArgb(0,0,0), 1);
                gfx.DrawRectangle(pen, rectangle);
                XTextFormatter textFormatter = new XTextFormatter(gfx);
                textFormatter.DrawString(accident.AccidentDescription, new XFont("Arial", 11), XBrushes.Black, rectangle, XStringFormats.TopLeft);
                textFormatter.Alignment = XParagraphAlignment.Justify;

                gfx.DrawString($"Zdjęcie ze zdarzenia:", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 485));
                using (var imageStream = new MemoryStream(accidentImage))
                {
                    XImage image = XImage.FromStream(() => imageStream);
                    gfx.DrawImage(image, 50, 495, 250, 250);
                }

                gfx.DrawString($"Detekcja szkody:", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 760));
                if (accident.DamageDetected == true)
                    gfx.DrawString($"System wykrył na zamieszczonym zdjeciu szkodę samochodową.",
                        new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 775));
                else if (accident.DamageDetected == false)
                {
                    gfx.DrawString($"System nie wykrył żadnych szkód samochodowych.", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 775));
                    gfx.DrawString($"Zdjęcie musi zostac przekazane do weryfikacji ręcznej.", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 790));
                }

                var stream = new MemoryStream();

                document.Save(stream);
                stream.Seek(0, SeekOrigin.Begin);

                return new FileStreamResult(stream, "application/x-download") { FileDownloadName = $"szkoda.pdf" };
            }
        }
    }
}
