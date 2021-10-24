using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Application.Configuration;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using InsuranceApp.Application.Exceptions;

namespace InsuranceApp.Application.Services
{
    public class CarDamageDetectionService : ICarDamageDetectionService
    {
        private readonly AzureCognitiveServiceSettings _settings;

        public CarDamageDetectionService(AzureCognitiveServiceSettings settings)
        {
            _settings = settings;
        }

        public async Task<bool> DetectCarDamage(AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;
            bool damageDetected = false;

            if (accidentImageDto.AccidentImage == null || accidentImageDto.AccidentImage.Length == 0)
                throw new BadRequestException("You do not upload photo.");

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

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
                foreach ( var prediction in dto.Predictions)
                {
                    if (prediction.Probability > 0.99)
                        damageDetected =  true;
                }

                return damageDetected;
            }
        }
    }
}
