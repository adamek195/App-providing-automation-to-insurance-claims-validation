﻿using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IUsersRepository
    {
        List<User> GetAllUsers();
        Task<User> AddUser(User newUser);
        Task<bool> SignIn(User loginUser);
    }
}