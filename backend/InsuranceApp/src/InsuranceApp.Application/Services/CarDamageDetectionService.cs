using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Application.Configuration;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json;

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

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            var client = new HttpClient();
            HttpResponseMessage response;

            using (var content = new ByteArrayContent(accidentImage))
            {
                client.DefaultRequestHeaders.Add("Prediction-Key", _settings.Key);
                content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response = await client.PostAsync(_settings.UrlPath, content);
                var dto = JsonConvert.DeserializeObject<CarDamageDto>(response.Content.ReadAsStringAsync().Result);
                foreach ( var damage in dto.Predictions)
                {
                    Console.WriteLine(damage.Probability);
                }
            }
        }
    }
}
