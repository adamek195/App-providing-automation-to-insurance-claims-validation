using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetAllUsers();

        Task<UserDto> CreateUser(CreateUserDto createUserDto);

        Task<bool> SignIn(LoginUserDto loginUserDto);

    }
}
