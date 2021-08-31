using InsuranceApp.Application.Dto;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IUsersService
    {
        Task<UserDto> GetUser(string userId);
        Task<UserDto> CreateUser(CreateUserDto newUserDto);
    }
}
