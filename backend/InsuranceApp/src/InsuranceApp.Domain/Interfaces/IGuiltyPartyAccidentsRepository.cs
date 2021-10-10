using InsuranceApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IGuiltyPartyAccidentsRepository
    {
        Task<List<GuiltyPartyAccident>> GetGuiltyPartyAccidents(Guid userId);
        Task<GuiltyPartyAccident> GetGuiltyPartyAccident(int accidentId, Guid userdId);
        Task<GuiltyPartyAccident> AddGuiltyPartyAccident(GuiltyPartyAccident newAccident, byte[] accidentImage);
        Task DeleteGuiltyPartyAccident(int accidentId, Guid userId);
    }
}
