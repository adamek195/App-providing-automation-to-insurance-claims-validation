using InsuranceApp.Application.Dto;
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
    }
}
