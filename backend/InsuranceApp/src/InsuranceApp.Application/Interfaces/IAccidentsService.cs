﻿using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IAccidentsService
    {
        Task<List<AccidentDto>> GetAccidents(int policyId, string userId);
        Task<AccidentDto> CreateAccident(int policyId, string userId, RequestAccidentDto newAccidentDto, AccidentImageDto accidentImageDto);
        Task DeleteAccident(int accidentId, int policyId, string userId);
        Task UpdateAccident(int accidentId, int policyId, string userId, RequestAccidentDto newAccidentDto, AccidentImageDto accidentImageDto);
    }
}