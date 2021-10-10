using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceApp.Infrastructure.Repositories
{
    public class GuiltyPartyAccidentsRepository: IGuiltyPartyAccidentsRepository
    {
        private readonly InsuranceAppContext _context;

        public GuiltyPartyAccidentsRepository(InsuranceAppContext context)
        {
            _context = context;
        }

        public async Task<List<GuiltyPartyAccident>> GetGuiltyPartyAccidents(Guid userId)
        {
            var accidents = await _context.GuiltyPartyAccidents.Where(a => a.UserId == userId).ToListAsync();

            return accidents;
        }
    }
}
