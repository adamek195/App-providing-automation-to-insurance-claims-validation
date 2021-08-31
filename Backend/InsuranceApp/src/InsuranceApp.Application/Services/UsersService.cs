using InsuranceApp.Application.Dto;
using InsuranceApp.Application.Interfaces;
using AutoMapper;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using InsuranceApp.Application.Exceptions;

namespace InsuranceApp.Application.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UsersService(IUsersRepository usersRepository, IMapper mapper, UserManager<User> userManager)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<UserDto> CreateUser(CreateUserDto newUserDto)
        {
            var user = await _userManager.FindByEmailAsync(newUserDto.Email);

            if (user != null)
                throw new ConflictException("User with the same email already exists!");

            var newUser = _mapper.Map<User>(newUserDto);

            if(newUser == null)
                throw new ConflictException("User creation failed! Please check user details and try again.");

            await _usersRepository.AddUser(newUser);

            return _mapper.Map<UserDto>(newUser);
        }

        public async Task<bool> SignIn(LoginUserDto loginUserDto)
        {
            var loginUser = _mapper.Map<User>(loginUserDto);
            var result = await _usersRepository.SignIn(loginUser);
            if (result)
                return true;
            else
                throw new NotFoundException("Wrong Email or Password! Please check user details and try again.");
        }
    }
}
