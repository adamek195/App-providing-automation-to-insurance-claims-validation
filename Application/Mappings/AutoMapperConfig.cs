﻿using Application.Dto;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<IdentityUser, UserDto>();
                cfg.CreateMap<CreateUserDto, IdentityUser>();
            })
            .CreateMapper();
    }
}
