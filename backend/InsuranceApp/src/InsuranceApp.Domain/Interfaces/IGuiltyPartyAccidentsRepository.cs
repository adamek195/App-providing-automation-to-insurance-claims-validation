using InsuranceApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IGuiltyPartyAccidentsRepository
    {
        Task<List<GuiltyPartyAccident>> GetGuiltyPartyAccidents(Guid userId);
        Task<GuiltyPartyAccident> GetGuiltyPartyAccident(int accidentId, Guid userId);
        Task<byte[]> GetGuiltyPartyAccidentImage(int accidentId, Guid userId);
        Task<GuiltyPartyAccident> AddGuiltyPartyAccident(GuiltyPartyAccident newAccident, byte[] accidentImage);
        Task DeleteGuiltyPartyAccident(int accidentId, Guid userId);
        Task UpdateGuiltyPartyAccident(int accidentId, GuiltyPartyAccident updatedAccident, byte[] accidentImage);
    }
}
