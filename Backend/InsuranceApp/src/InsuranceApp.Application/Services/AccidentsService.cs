using AutoMapper;
using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Exceptions;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Services
{
    public class AccidentsService: IAccidentsService
    {
        private readonly IAccidentsRepository _accidentsRepository;
        private readonly IPoliciesRepository _policiesRepository;
        private readonly IMapper _mapper;

        public AccidentsService(IAccidentsRepository accidentsRepository, IPoliciesRepository policiesRepository, IMapper mapper)
        {
            _accidentsRepository = accidentsRepository;
            _policiesRepository = policiesRepository;
            _mapper = mapper;
        }

        public async Task<List<AccidentDto>> GetAccidents(int policyId, string userId)
        {
            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidents = await _accidentsRepository.GetAccidents(policyId);

            return _mapper.Map<List<AccidentDto>>(accidents);
        }

        public async Task<AccidentDto> CreateAccident(int policyId, string userId, RequestAccidentDto newAccidentDto, AccidentImageDto accidentImageDto)
        {
            byte[] accidentImage;

            if (accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpeg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/jpg" &&
                accidentImageDto.AccidentImage.ContentType.ToLower() != "image/png")
                throw new BadRequestException("You do not upload photo.");

            var policyWithAccidents = await _policiesRepository.GetUserPolicy(policyId, Guid.Parse(userId));

            if (policyWithAccidents == null)
                throw new NotFoundException("Policy with this id does not exist.");

            var accidentToAdd = _mapper.Map<Accident>(newAccidentDto);
            accidentToAdd.PolicyId = policyId;

            using (var memoryStream = new MemoryStream())
            {
                await accidentImageDto.AccidentImage.CopyToAsync(memoryStream);
                accidentImage = memoryStream.ToArray();
            }

            await _accidentsRepository.AddAccident(accidentToAdd, accidentImage);

            return _mapper.Map<AccidentDto>(accidentToAdd);

        }
    }
}
