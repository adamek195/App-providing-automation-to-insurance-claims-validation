using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using InsuranceApp.Infrastructure.Data;
using System;
using Microsoft.EntityFrameworkCore;

namespace InsuranceApp.Infrastructure.Repositories
{
    public class PoliciesRepository : IPoliciesRepository
    {
        private readonly InsuranceAppContext _context;

        public PoliciesRepository(InsuranceAppContext context)
        {
            _context = context;
        }

        public async Task<List<Policy>> GetUserPolicies(Guid userId)
        {
            var userPolicies = await _context.Policies.Where(p => p.UserId == userId).ToListAsync();

            return userPolicies;
        }

        public async Task<Policy> GetUserPolicy(int policyId, Guid userId)
        {
            var userPolicy = await _context.Policies.SingleOrDefaultAsync(p => p.Id == policyId && p.UserId == userId);

            return userPolicy;
        }

        public async Task<Policy> GetUserPolicyByPolicyNumber(string policyNumber)
        {
            var userPolicy = await _context.Policies.SingleOrDefaultAsync(p => p.PolicyNumber == policyNumber);

            return userPolicy;
        }

        public async Task<Policy> AddPolicy(Policy newPolicy)
        {
            _context.Policies.Add(newPolicy);
            await _context.SaveChangesAsync();

            return newPolicy;
        }

        public async Task DeletePolicy(int policyId, Guid userId)
        {
            var policyToDelete = await _context.Policies.SingleOrDefaultAsync(p => p.Id == policyId && p.UserId == userId);

            if (policyToDelete != null)
                _context.Policies.Remove(policyToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task UpdatePolicy(int policyId, Policy updatedPolicy)
        {
            var policyToUpdate = await _context.Policies.SingleOrDefaultAsync(p => p.Id == policyId && p.UserId == updatedPolicy.UserId);

            if(policyToUpdate != null)
            {
                policyToUpdate.PolicyNumber = updatedPolicy.PolicyNumber;
                policyToUpdate.PolicyCreationDate = updatedPolicy.PolicyCreationDate;
                policyToUpdate.PolicyExpireDate = updatedPolicy.PolicyExpireDate;
                policyToUpdate.Company = updatedPolicy.Company;
                policyToUpdate.TypeOfInsurance = updatedPolicy.TypeOfInsurance;
                policyToUpdate.RegistrationNumber = updatedPolicy.RegistrationNumber;
                policyToUpdate.Mark = updatedPolicy.Mark;
                policyToUpdate.Model = updatedPolicy.Model;
            }

            await _context.SaveChangesAsync();
        }
    }
}
