using InsuranceApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IGuiltyPartyAccidentsRepository
    {
        Task<List<GuiltyPartyAccident>> GetGuiltyPartyAccidents(Guid userId);
        Task<GuiltyPartyAccident> AddGuiltyPartyAccident(GuiltyPartyAccident newAccident, byte[] accidentImage);
    }
}
