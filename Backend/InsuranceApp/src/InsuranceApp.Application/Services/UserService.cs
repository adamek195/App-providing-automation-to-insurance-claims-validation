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
            var userExists = await _userManager.FindByEmailAsync(newUserDto.Email);
            if (userExists != null)
                throw new ConflictException("User with the same email already exists!");

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
                throw new NotFoundException("Wrong Email or Password! Please check user details and try again.");

        }
    }
}
