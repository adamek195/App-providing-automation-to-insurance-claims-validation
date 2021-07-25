using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly InsuranceAppContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(InsuranceAppContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public async Task<User> AddUser(User newUser)
        {
            var result = await _userManager.CreateAsync(newUser, newUser.PasswordHash);
            if (!result.Succeeded)
                throw new Exception("User creation failed! Please check user details and try again.");

            return newUser;
        }

        public async Task<bool> SignIn(User loginUser)
        {
            var user = await _userManager.FindByNameAsync(loginUser.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginUser.PasswordHash))
                return true;
            else
                return false;
        }
    }
}
