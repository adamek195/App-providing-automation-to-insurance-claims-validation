using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IUserAccidentsService
    {
        Task<List<UserAccidentDto>> GetUserAccidents(int policyId, string userId);
        Task<UserAccidentDto> GetUserAccident(int accidentId, int policyId, string userId);
        Task<byte[]> GetUserAccidentImage(int accidentId, int policyId, string userId);
        Task<UserAccidentDto> CreateUserAccident(int policyId, string userId, RequestUserAccidentDto newAccidentDto, AccidentImageDto accidentImageDto, bool damageDetected);
        Task DeleteUserAccident(int accidentId, int policyId, string userId);
        Task UpdateUserAccident(int accidentId, int policyId, string userId, RequestUserAccidentDto newAccidentDto, AccidentImageDto accidentImageDto, bool damageDetected);
    }
}
