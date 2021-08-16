using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Infrastructure.Repositories
{
    public class AccidentsRepository : IAccidentsRepository
    {
        private readonly InsuranceAppContext _context;

        public AccidentsRepository(InsuranceAppContext context)
        {
            _context = context;
        }

        public async Task<List<Accident>> GetAccidents(int policyId)
        {
            var accidents = await _context.Accidents.Where(a => a.PolicyId == policyId).ToListAsync();
            return accidents;
        }

        public async Task<Accident> GetAccident(int accidentId)
        {
            var accident = await _context.Accidents.SingleOrDefaultAsync(a => a.Id == accidentId);

            return accident;
        }

        public async Task<Accident> AddAccident(Accident newAccident, byte[] accidentImage)
        {
            newAccident.AccidentImage = accidentImage;

            _context.Accidents.Add(newAccident);
            await _context.SaveChangesAsync();

            return newAccident;
        }
    }
}
