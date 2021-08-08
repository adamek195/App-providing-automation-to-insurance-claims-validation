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

        public async Task<Policy> AddPolicy(Policy newPolicy)
        {
            _context.Policies.Add(newPolicy);
            await _context.SaveChangesAsync();
            return newPolicy;
        }
    }
}
