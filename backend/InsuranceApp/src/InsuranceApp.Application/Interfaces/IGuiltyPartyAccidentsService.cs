using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IGuiltyPartyAccidentsService
    {
        Task<List<GuiltyPartyAccidentDto>> GetGuiltyPartyAccidents(string userId);
        Task<GuiltyPartyAccidentDto> CreateGuiltyPartyAccident(string userId, RequestGuiltyPartyAccidentDto newAccidentDto, AccidentImageDto accidentImageDto);
        Task DeleteGuiltyPartyAccident(int accidentId, string userId);
        Task UpdateGuiltyPartyAccident(int accidentId, string userId, RequestGuiltyPartyAccidentDto updatedAccidentDto, AccidentImageDto accidentImageDto);
        Task DetectCarDamage(AccidentImageDto accidentImageDto);
    }
}
