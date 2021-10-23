using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Exceptions;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace InsuranceApp.Application.Services
{
    public class GuiltyPartyAccidentsService: IGuiltyPartyAccidentsService
    {
        private readonly IGuiltyPartyAccidentsRepository _guiltyPartyAccidentsRepository;
        private readonly IMapper _mapper;

        public GuiltyPartyAccidentsService(IGuiltyPartyAccidentsRepository guiltyPartyAccidentsRepository, IMapper mapper)
        {
            _guiltyPartyAccidentsRepository = guiltyPartyAccidentsRepository;
            _mapper = mapper;
        }

        public async Task<List<GuiltyPartyAccidentDto>> GetGuiltyPartyAccidents(string userId)
        {
            var accidents = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccidents(Guid.Parse(userId));

            return _mapper.Map<List<GuiltyPartyAccidentDto>>(accidents);
        }

        public async Task<GuiltyPartyAccidentDto> CreateGuiltyPartyAccident(string userId, RequestGuiltyPartyAccidentDto newAccidentDto,
            AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;

            if (accidentImageDto.AccidentImage == null || accidentImageDto.AccidentImage.Length == 0)
                throw new BadRequestException("You do not upload photo.");

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

            var accidentToAdd = _mapper.Map<GuiltyPartyAccident>(newAccidentDto);
            accidentToAdd.UserId = Guid.Parse(userId);

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            await _guiltyPartyAccidentsRepository.AddGuiltyPartyAccident(accidentToAdd, accidentImage);

            return _mapper.Map<GuiltyPartyAccidentDto>(accidentToAdd);
        }

        public async Task DeleteGuiltyPartyAccident(int accidentId, string userId)
        {
            var accidentToDelete = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccident(accidentId, Guid.Parse(userId));

            if (accidentToDelete == null)
                throw new NotFoundException("Accident with this id does not exist.");

            await _guiltyPartyAccidentsRepository.DeleteGuiltyPartyAccident(accidentId, Guid.Parse(userId));
        }

        public async Task UpdateGuiltyPartyAccident(int accidentId, string userId, RequestGuiltyPartyAccidentDto updatedAccidentDto, AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;

            if (accidentImageDto.AccidentImage == null || accidentImageDto.AccidentImage.Length == 0)
                throw new BadRequestException("You do not upload photo.");

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

            var accidentToUpdate = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccident(accidentId, Guid.Parse(userId));

            if (accidentToUpdate == null)
                throw new NotFoundException("Accident with this id does not exist.");

            accidentToUpdate = _mapper.Map<GuiltyPartyAccident>(updatedAccidentDto);
            accidentToUpdate.UserId = Guid.Parse(userId);

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            await _guiltyPartyAccidentsRepository.UpdateGuiltyPartyAccident(accidentId, accidentToUpdate, accidentImage);
        }

        public async Task DetectCarDamage(AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;

            var client = new HttpClient();

            client.DefaultRequestHeaders.Add("Prediction-Key", "prediction-key");

            string url = "https://westeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/90a7e9a6-9f36-4364-8bf7-ee773b1846ad/detect/iterations/Iteration1/image";

            HttpResponseMessage response;

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            using( var content = new ByteArrayContent(accidentImage))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response = await client.PostAsync(url, content);
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
        }
    }
}
