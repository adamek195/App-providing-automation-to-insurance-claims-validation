using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Exceptions;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System;

namespace InsuranceApp.Application.Services
{
    public class UserAccidentsService: IUserAccidentsService
    {
        private readonly IUserAccidentsRepository _userAccidentsRepository;
        private readonly IPoliciesRepository _policiesRepository;
        private readonly IMapper _mapper;

        public UserAccidentsService(IUserAccidentsRepository userAccidentsRepository, IPoliciesRepository policiesRepository, IMapper mapper)
        {
            _userAccidentsRepository = userAccidentsRepository;
            _policiesRepository = policiesRepository;
            _mapper = mapper;
        }

        public async Task<List<UserAccidentDto>> GetUserAccidents(int policyId, string userId)
        {
            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidents = await _userAccidentsRepository.GetUserAccidents(policyId);

            return _mapper.Map<List<UserAccidentDto>>(accidents);
        }

        public async Task<UserAccidentDto> CreateUserAccident(int policyId, string userId,
            RequestUserAccidentDto newAccidentDto, AccidentImageDto accidentImageDto, bool damageDetected)
        {
            byte[] accidentImage;

            if (accidentImageDto.AccidentImage == null || accidentImageDto.AccidentImage.Length == 0)
                throw new BadRequestException("You do not upload photo.");

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidentToAdd = _mapper.Map<UserAccident>(newAccidentDto);
            accidentToAdd.PolicyId = policyId;
            accidentToAdd.DamageDetected = damageDetected;

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            await _userAccidentsRepository.AddUserAccident(accidentToAdd, accidentImage);

            return _mapper.Map<UserAccidentDto>(accidentToAdd);
        }

        public async Task DeleteUserAccident(int accidentId, int policyId, string userId)
        {
            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidentToDelete = await _userAccidentsRepository.GetUserAccident(accidentId, policyId);

            if (accidentToDelete == null)
                throw new NotFoundException("Accident with this id does not exist.");

            await _userAccidentsRepository.DeleteUserAccident(accidentId, policyId);
        }

        public async Task UpdateUserAccident(int accidentId, int policyId, string userId,
            RequestUserAccidentDto updatedAccidentDto, AccidentImageDto accidentImageDto, bool damageDetected)
        {
            byte[] accidentImage;

            if (accidentImageDto.AccidentImage == null || accidentImageDto.AccidentImage.Length == 0)
                throw new BadRequestException("You do not upload photo.");

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidentToUpdate = await _userAccidentsRepository.GetUserAccident(accidentId, policyId);

            if (accidentToUpdate == null)
                throw new NotFoundException("Accident with this id does not exist.");

            accidentToUpdate = _mapper.Map<UserAccident>(updatedAccidentDto);
            accidentToUpdate.DamageDetected = damageDetected;

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            await _userAccidentsRepository.UpdateUserAccident(accidentId, policyId, accidentToUpdate, accidentImage);
        }
    }
}
