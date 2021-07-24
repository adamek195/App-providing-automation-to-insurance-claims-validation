﻿using Application.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public List<UserDto> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return _mapper.Map<List<UserDto>>(users);
        }

        public UserDto CreateUser(CreateUserDto newUserDto)
        {
            if (string.IsNullOrEmpty(newUserDto.UserName) || string.IsNullOrEmpty(newUserDto.Email))
                throw new Exception("Information about user can not be empty");

            Console.WriteLine(newUserDto.Email + newUserDto.UserName);
            var newUser = _mapper.Map<User>(newUserDto);
            _userRepository.AddUser(newUser);
            return _mapper.Map<UserDto>(newUser);
        }
    }
}
