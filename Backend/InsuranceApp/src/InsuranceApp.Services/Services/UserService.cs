﻿using InsuranceApp.Services.Dto;
using InsuranceApp.Services.Interfaces;
using AutoMapper;
using InsuranceApp.Core.Entities;
using InsuranceApp.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace InsuranceApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UserService(IUserRepository userRepository, IMapper mapper, UserManager<User> userManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        public List<UserDto> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> CreateUser(CreateUserDto newUserDto)
        {
            if (string.IsNullOrEmpty(newUserDto.UserName) || string.IsNullOrEmpty(newUserDto.Email))
                throw new Exception("Information about user can not be empty");

            var userExists = await _userManager.FindByNameAsync(newUserDto.UserName);
            if (userExists != null)
                throw new Exception("User already exists!");

            var newUser = _mapper.Map<User>(newUserDto);
            await _userRepository.AddUser(newUser);
            return _mapper.Map<UserDto>(newUser);
        }

        public async Task<bool> SignIn(LoginUserDto loginUserDto)
        {
            var loginUser = _mapper.Map<User>(loginUserDto);
            var result = await _userRepository.SignIn(loginUser);
            if (result)
                return true;
            else
                throw new Exception("Wrong User Name or Password! Please check user details and try again.");

        }
    }
}
