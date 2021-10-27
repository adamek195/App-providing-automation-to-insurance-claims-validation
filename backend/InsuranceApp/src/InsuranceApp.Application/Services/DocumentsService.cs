using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Interfaces;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Services
{
    public class DocumentsService: IDocumentsService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IPoliciesRepository _policiesRepository;
        private readonly IGuiltyPartyAccidentsRepository _guiltyPartyAccidentsRepository;
        private readonly IUserAccidentsRepository _userAccidentsRepository;

        public DocumentsService(IUsersRepository usersRepository, IPoliciesRepository policiesRepository,
            IGuiltyPartyAccidentsRepository guiltyPartyAccidentsRepository, IUserAccidentsRepository userAccidentsRepository)
        {
            _usersRepository = usersRepository;
            _policiesRepository = policiesRepository;
            _guiltyPartyAccidentsRepository = guiltyPartyAccidentsRepository;
            _userAccidentsRepository = userAccidentsRepository;
        }

        public async Task<byte[]> CreateGuiltyPartyAccidentDocument(string userId, int accidentId)
        {
            var user = await _usersRepository.GetUser(userId);
            var accident = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccident(accidentId, Guid.Parse(userId));

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            using (var stream = new MemoryStream())
            {
                PdfDocument document = new PdfDocument();
                document.Info.Title = $"Szkoda_nr_{accident.Id}";
                PdfPage page = document.AddPage();

                XGraphics gfx = XGraphics.FromPdfPage(page);

                gfx.DrawString("Zgłoszenie szkody w pojeździe", new XFont("Arial", 40, XFontStyle.Bold), XBrushes.Black, new XPoint(200, 70));

                document.Save(stream, false);

                stream.Seek(0, SeekOrigin.Begin);
                return stream.ToArray();
            }
        }

        public Task CreateUserAccidentDocument(string userId, int accidentId)
        {
            throw new NotImplementedException();
        }
    }
}
