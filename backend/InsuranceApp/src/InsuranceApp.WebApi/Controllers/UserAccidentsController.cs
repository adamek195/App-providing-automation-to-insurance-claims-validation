using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.WebApi.Helpers;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.Application.Dto;
using System;
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;
using System.IO;
using PdfSharpCore.Drawing.Layout;

namespace InsuranceApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [GlobalExceptionFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserAccidentsController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IPoliciesService _policiesService;
        private readonly IUserAccidentsService _userAccidentsService;
        private readonly ICarDamageDetectionService _carDamageDetectionService;

        public UserAccidentsController(IUsersService usersService, IPoliciesService policiesService,
        IUserAccidentsService userAccidentsService, ICarDamageDetectionService carDamageDetectionService)
        {
            _usersService = usersService;
            _policiesService = policiesService;
            _userAccidentsService = userAccidentsService;
            _carDamageDetectionService = carDamageDetectionService;
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
            var damageDetected = await _carDamageDetectionService.DetectCarDamage(accidentImageDto);
            var newAccident = await _userAccidentsService.CreateUserAccident(policyId, User.GetId(), newAccidentDto, accidentImageDto, damageDetected);

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
            var damageDetected = await _carDamageDetectionService.DetectCarDamage(accidentImageDto);
            await _userAccidentsService.UpdateUserAccident(accidentId, policyId, User.GetId(), updatedAccidentDto, accidentImageDto, damageDetected);

            return NoContent();
        }

        [HttpPost("{policyId}/{accidentId}/Documents/AC")]
        public async Task<IActionResult> CreateUserAccidentDocumentAC([FromRoute] int policyId, [FromRoute] int accidentId)
        {
            var user = await _usersService.GetUser(User.GetId());
            var policy = await _policiesService.GetUserPolicy(policyId, User.GetId());
            var accident = await _userAccidentsService.GetUserAccident(accidentId, policyId, User.GetId());
            var accidentImage = await _userAccidentsService.GetUserAccidentImage(accidentId, policyId, User.GetId());

            if (policy.TypeOfInsurance != "AC")
                return Conflict("You can not generate a document with an accident with OC policy.");

            using (PdfDocument document = new PdfDocument())
            {
                PdfPage page = document.AddPage();

                XGraphics gfx = XGraphics.FromPdfPage(page);

                gfx.DrawString("Zgłoszenie szkody samochodowej", new XFont("Arial", 30, XFontStyle.Bold), XBrushes.Black, new XPoint(65, 50));
                gfx.DrawString("Rodzaj ubezpieczenia: Ubezpieczenie użytkownika (AC)", new XFont("Arial", 20, XFontStyle.Bold), XBrushes.Black, new XPoint(40, 75));

                gfx.DrawString($"Dane użytkownika", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 120));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 130), new XPoint(550, 130));

                gfx.DrawString($"Użytkownik: {user.FirstName} {user.LastName}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 150));
                gfx.DrawString($"Email: {user.Email}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 165));
                gfx.DrawString($"Pesel: {user.PersonalIdentitynumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 180));
                gfx.DrawString($"Numer telefonu: {user.PhoneNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 195));
                gfx.DrawString($"Miasto: {user.City}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 210));
                gfx.DrawString($"Kod pocztowy: {user.PostalCode}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 225));
                gfx.DrawString($"Adres zamieszkania: {user.Address}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 240));

                gfx.DrawString($"Polisa", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 260));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 270), new XPoint(550, 270));

                gfx.DrawString($"Numer polisy: {policy.PolicyNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 290));
                gfx.DrawString($"Data utworzenia polisy: {policy.PolicyCreationDate.ToString("d")}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 305));
                gfx.DrawString($"Data wygaśnięcia polisy: {policy.PolicyExpireDate.ToString("d")}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 320));
                gfx.DrawString($"Ubezpieczyciel: {policy.Company}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 335));
                gfx.DrawString($"Numer rejestracyjny ubezpieczonego samochodu: {policy.RegistrationNumber}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 350));
                gfx.DrawString($"Marka ubezpieczonego samochodu: {policy.Mark}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 365));
                gfx.DrawString($"Model ubezpieczonego samochodu: {policy.Model}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 380));

                gfx.DrawString($"Zdarzenie", new XFont("Arial", 15, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 400));
                gfx.DrawLine(new XPen(XColor.FromArgb(0, 0, 0)), new XPoint(50, 410), new XPoint(550, 410));

                gfx.DrawString($"Data zdarzenia: {accident.AccidentDateTime.Date.ToString("d")}", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 430));
                gfx.DrawString($"Opis:", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 445));
                XRect rectangle = new XRect(50, 460, 500, 50);
                XPen pen = new XPen(XColor.FromArgb(0, 0, 0), 1);
                gfx.DrawRectangle(pen, rectangle);
                XTextFormatter textFormatter = new XTextFormatter(gfx);
                textFormatter.DrawString(accident.AccidentDescription, new XFont("Arial", 11), XBrushes.Black, rectangle, XStringFormats.TopLeft);
                textFormatter.Alignment = XParagraphAlignment.Justify;

                gfx.DrawString($"Zdjęcie ze zdarzenia:", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 525));
                using (var imageStream = new MemoryStream(accidentImage))
                {
                    XImage image = XImage.FromStream(() => imageStream);
                    gfx.DrawImage(image, 50, 535, 250, 250);
                }

                gfx.DrawString($"Detekcja szkody:", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Black, new XPoint(50, 800));
                if (accident.DamageDetected == true)
                    gfx.DrawString($"System wykrył na zamieszczonym zdjeciu szkodę samochodową.",
                        new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 815));
                else if (accident.DamageDetected == false)
                {
                    gfx.DrawString($"System nie wykrył żadnych szkód samochodowych.", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 815));
                    gfx.DrawString($"Zdjęcie musi zostac przekazane do weryfikacji ręcznej.", new XFont("Arial", 11, XFontStyle.Bold), XBrushes.Red, new XPoint(50, 830));
                }

                var stream = new MemoryStream();

                document.Save(stream);
                stream.Seek(0, SeekOrigin.Begin);

                return new FileStreamResult(stream, "application/x-download") { FileDownloadName = $"szkoda.pdf" };
            }
        }

        [HttpPost("{policyId}/{accidentId}/Documents/OC")]
        public async Task<IActionResult> CreateUserAccidentDocumentOC([FromRoute] int accidentId)
        {
            throw new NotImplementedException();
        }
    }
}
