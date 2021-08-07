﻿using InsuranceApp.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Core.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        Task<User> AddUser(User newUser);
        Task<bool> SignIn(User loginUser);
    }
}
