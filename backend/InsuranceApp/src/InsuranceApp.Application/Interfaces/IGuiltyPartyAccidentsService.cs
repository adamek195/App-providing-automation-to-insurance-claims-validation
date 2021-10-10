using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IGuiltyPartyAccidentsService
    {
        Task<List<GuiltyPartyAccidentDto>> GetGuiltyPartyAccidents(string userId);
        Task<GuiltyPartyAccidentDto> CreateGuiltyPartyAccident(string userId, RequestGuiltyPartyAccidentDto newAccidentDto, AccidentImageDto accidentImageDto);
    }
}
