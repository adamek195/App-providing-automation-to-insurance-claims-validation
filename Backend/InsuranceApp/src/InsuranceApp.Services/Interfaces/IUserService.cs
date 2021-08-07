using InsuranceApp.Services.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Services.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetAllUsers();

        Task<UserDto> CreateUser(CreateUserDto createUserDto);

        Task<bool> SignIn(LoginUserDto loginUserDto);

    }
}
