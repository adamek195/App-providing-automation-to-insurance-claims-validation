using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace InsuranceApp.Infrastructure.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly InsuranceAppContext _context;
        private readonly UserManager<User> _userManager;

        public UsersRepository(InsuranceAppContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> AddUser(User newUser)
        {
            var result = await _userManager.CreateAsync(newUser, newUser.PasswordHash);

            if (!result.Succeeded)
                return null;

            return newUser;
        }

        public async Task<bool> SignIn(User loginUser)
        {
            var user = await _userManager.FindByEmailAsync(loginUser.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.PasswordHash))
                return true;
            else
                return false;
        }
    }
}
