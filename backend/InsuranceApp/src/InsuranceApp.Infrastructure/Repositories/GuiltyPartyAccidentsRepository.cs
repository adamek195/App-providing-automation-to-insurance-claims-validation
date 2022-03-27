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
    public class GuiltyPartyAccidentsRepository : IGuiltyPartyAccidentsRepository
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

        public async Task<GuiltyPartyAccident> GetGuiltyPartyAccident(int accidentId, Guid userId)
        {
            var accident = await _context.GuiltyPartyAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.UserId == userId);

            return accident;
        }

        public async Task<byte[]> GetGuiltyPartyAccidentImage(int accidentId, Guid userId)
        {
            var accident = await _context.GuiltyPartyAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.UserId == userId);

            return accident.AccidentImage;
        }

        public async Task<GuiltyPartyAccident> AddGuiltyPartyAccident(GuiltyPartyAccident newAccident, byte[] accidentImage)
        {
            newAccident.AccidentImage = accidentImage;

            _context.GuiltyPartyAccidents.Add(newAccident);
            await _context.SaveChangesAsync();

            return newAccident;
        }

        public async Task DeleteGuiltyPartyAccident(int accidentId, Guid userId)
        {
            var accidentToDelete = await _context.GuiltyPartyAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.UserId == userId);

            if (accidentToDelete != null)
                _context.GuiltyPartyAccidents.Remove(accidentToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateGuiltyPartyAccident(int accidentId, GuiltyPartyAccident updatedAccident, byte[] accidentImage)
        {
            var accidentToUpdate = await _context.GuiltyPartyAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.UserId == updatedAccident.UserId);

            if (accidentToUpdate != null)
            {
                accidentToUpdate.AccidentDateTime = updatedAccident.AccidentDateTime;
                accidentToUpdate.AccidentDescription = updatedAccident.AccidentDescription;
                accidentToUpdate.GuiltyPartyPolicyNumber = updatedAccident.GuiltyPartyPolicyNumber;
                accidentToUpdate.GuiltyPartyRegistrationNumber = updatedAccident.GuiltyPartyRegistrationNumber;
                accidentToUpdate.AccidentImage = accidentImage;
                accidentToUpdate.DamageDetected = updatedAccident.DamageDetected;
            }

            await _context.SaveChangesAsync();
        }
    }
}
