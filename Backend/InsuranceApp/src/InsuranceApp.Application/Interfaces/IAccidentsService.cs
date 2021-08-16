using InsuranceApp.Application.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IAccidentsService
    {
        Task<List<AccidentDto>> GetAccidents(int policyId, string userId);
        Task<AccidentDto> CreateAccident(int policyId, string userId, RequestAccidentDto newAccidentDto, AccidentImageDto accidentImageDto);
    }
}
