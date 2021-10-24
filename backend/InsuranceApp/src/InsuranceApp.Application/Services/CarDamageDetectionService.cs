using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Application.Configuration;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System;

namespace InsuranceApp.Application.Services
{
    public class CarDamageDetectionService : ICarDamageDetectionService
    {
        private readonly AzureCognitiveServiceSettings _settings;

        public CarDamageDetectionService(AzureCognitiveServiceSettings settings)
        {
            _settings = settings;
        }

        public async Task DetectCarDamage(AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;

            var client = new HttpClient();

            client.DefaultRequestHeaders.Add("Prediction-Key", _settings.Key);

            HttpResponseMessage response;

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            using (var content = new ByteArrayContent(accidentImage))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response = await client.PostAsync(_settings.UrlPath, content);
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
        }
    }
}
