using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceApp.Infrastructure.Repositories
{
    public class UserAccidentsRepository : IUserAccidentsRepository
    {
        private readonly InsuranceAppContext _context;

        public UserAccidentsRepository(InsuranceAppContext context)
        {
            _context = context;
        }

        public async Task<List<UserAccident>> GetUserAccidents(int policyId)
        {
            var accidents = await _context.UserAccidents.Where(a => a.PolicyId == policyId).ToListAsync();

            return accidents;
        }

        public async Task<UserAccident> GetUserAccident(int accidentId, int policyId)
        {
            var accident = await _context.UserAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            return accident;
        }

        public async Task<UserAccident> AddUserAccident(UserAccident newAccident, byte[] accidentImage)
        {
            newAccident.AccidentImage = accidentImage;

            _context.UserAccidents.Add(newAccident);
            await _context.SaveChangesAsync();

            return newAccident;
        }

        public async Task DeleteUserAccident(int accidentId, int policyId)
        {
            var accidentToDelete = await _context.UserAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            if (accidentToDelete != null)
                _context.UserAccidents.Remove(accidentToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAccident(int accidentId, int policyId, UserAccident updatedAccident, byte[] accidentImage)
        {
            var accidentToUpdate = await _context.UserAccidents.SingleOrDefaultAsync(a => a.Id == accidentId && a.PolicyId == policyId);

            if (accidentToUpdate != null)
            {
                accidentToUpdate.AccidentDateTime = updatedAccident.AccidentDateTime;
                accidentToUpdate.AccidentDescription = updatedAccident.AccidentDescription;
                accidentToUpdate.VictimRegistrationNumber = updatedAccident.VictimRegistrationNumber;
                accidentToUpdate.VictimFirstName = updatedAccident.VictimFirstName;
                accidentToUpdate.VictimLastName = updatedAccident.VictimLastName;
                accidentToUpdate.AccidentImage = accidentImage;
                accidentToUpdate.DamageDetected = updatedAccident.DamageDetected;
            }

            await _context.SaveChangesAsync();
        }
    }
}
