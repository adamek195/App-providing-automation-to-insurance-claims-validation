﻿using Application.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetAllUsers();

        UserDto CreateUser(CreateUserDto createUserDto);

    }
}
