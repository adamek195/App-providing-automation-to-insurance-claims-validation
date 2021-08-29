using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IAccidentsRepository
    {
        Task<List<Accident>> GetAccidents(int policyId);
        Task<Accident> GetAccident(int accidentId, int policyId);
        Task<Accident> AddAccident(Accident newAccident, byte[] accidentImage);
        Task DeleteAccident(int accidentId, int policyId);
        Task UpdateAccident(int accidentId, int policyId, Accident updatedAccident, byte[] accidentImage);
    }
}
