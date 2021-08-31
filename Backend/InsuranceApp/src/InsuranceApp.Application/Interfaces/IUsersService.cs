using InsuranceApp.Application.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IUsersService
    {
        Task<UserDto> CreateUser(CreateUserDto newUserDto);

        Task<bool> SignIn(LoginUserDto loginUserDto);
    }
}
