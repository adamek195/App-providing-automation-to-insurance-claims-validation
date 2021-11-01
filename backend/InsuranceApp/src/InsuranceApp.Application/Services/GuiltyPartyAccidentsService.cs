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

        public async Task<GuiltyPartyAccidentDto> GetGuiltyPartyAccident(int accidentId, string userId)
        {
            var accident = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccident(accidentId, Guid.Parse(userId));

            if (accident == null)
                throw new NotFoundException("Accident with this id does not exist.");

            return _mapper.Map<GuiltyPartyAccidentDto>(accident);
        }

        public async Task<byte[]> GetGuiltyPartyAccidentImage(int accidentId, string userId)
        {
            var image = await _guiltyPartyAccidentsRepository.GetGuiltyPartyAccidentImage(accidentId, Guid.Parse(userId));

            if (image == null || image.Length == 0)
                throw new NotFoundException("Photo does not exist.");

            return image;
        }

        public async Task<GuiltyPartyAccidentDto> CreateGuiltyPartyAccident(string userId, RequestGuiltyPartyAccidentDto newAccidentDto,
            AccidentImageDto accidentImageDto, bool damageDetected)
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
            accidentToAdd.DamageDetected = damageDetected;

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

        public async Task UpdateGuiltyPartyAccident(int accidentId, string userId, RequestGuiltyPartyAccidentDto updatedAccidentDto,
            AccidentImageDto accidentImageDto, bool damageDetected)
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
            accidentToUpdate.DamageDetected = damageDetected;

            using (var stream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(stream);
                accidentImage = stream.ToArray();
            }

            await _guiltyPartyAccidentsRepository.UpdateGuiltyPartyAccident(accidentId, accidentToUpdate, accidentImage);
        }
    }
}
