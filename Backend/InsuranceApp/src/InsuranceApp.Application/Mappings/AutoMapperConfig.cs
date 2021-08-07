﻿using InsuranceApp.Domain.Entities;
using InsuranceApp.Application.Dto;
using AutoMapper;

namespace InsuranceApp.Application.Mappings
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<LoginUserDto, User>();
                cfg.CreateMap<UserDto, User>();
                cfg.CreateMap<CreateUserDto, User>();
            })
            .CreateMapper();
    }
}
