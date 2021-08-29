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

        public async Task<Accident> GetAccident(int accidentId, int policyId)
        {
            var accident = await _context.Accidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            return accident;
        }

        public async Task<Accident> AddAccident(Accident newAccident, byte[] accidentImage)
        {
            newAccident.AccidentImage = accidentImage;

            _context.Accidents.Add(newAccident);
            await _context.SaveChangesAsync();

            return newAccident;
        }

        public async Task DeleteAccident(int accidentId, int policyId)
        {
            var accidentToDelete = await _context.Accidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            if (accidentToDelete != null)
                _context.Accidents.Remove(accidentToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAccident(int accidentId, int policyId, Accident updatedAccident, byte[] accidentImage)
        {
            var accidentToUpdate = await _context.Accidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            if (accidentToUpdate != null)
            {
                accidentToUpdate.AccidentDateTime = updatedAccident.AccidentDateTime;
                accidentToUpdate.AccidentDescription = updatedAccident.AccidentDescription;
                accidentToUpdate.GuiltyPartyPolicyNumber = updatedAccident.GuiltyPartyPolicyNumber;
                accidentToUpdate.GuiltyPartyPolicyNumber = updatedAccident.GuiltyPartyPolicyNumber;
                accidentToUpdate.AccidentImage = accidentImage;
            }

            await _context.SaveChangesAsync();
        }
    }
}
