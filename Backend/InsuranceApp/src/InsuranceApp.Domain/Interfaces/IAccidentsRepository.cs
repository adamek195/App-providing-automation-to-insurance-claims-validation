using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IAccidentsRepository
    {
        Task<List<Accident>> GetAccidents(int policyId);
        Task<Accident> GetAccident(int id);
        Task<Accident> AddAccident(Accident newAccident, byte[] accidentImage);
    }
}
