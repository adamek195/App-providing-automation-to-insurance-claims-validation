using InsuranceApp.Services.Dto;
using AutoMapper;
using InsuranceApp.Core.Entities;

namespace InsuranceApp.Services.Mappings
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
