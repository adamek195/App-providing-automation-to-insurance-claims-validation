using InsuranceApp.Application.Dto;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface ITokenService
    {
        Task<string> GetToken(LoginUserDto loginDataDto);
    }
}
