using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IUserAccidentsRepository
    {
        Task<List<UserAccident>> GetUserAccidents(int policyId);
        Task<UserAccident> GetUserAccident(int accidentId, int policyId);
        Task<byte[]> GetUserAccidentImage(int accidentId, int policyId);
        Task<UserAccident> AddUserAccident(UserAccident newAccident, byte[] accidentImage);
        Task DeleteUserAccident(int accidentId, int policyId);
        Task UpdateUserAccident(int accidentId, int policyId, UserAccident updatedAccident, byte[] accidentImage);
    }
}
