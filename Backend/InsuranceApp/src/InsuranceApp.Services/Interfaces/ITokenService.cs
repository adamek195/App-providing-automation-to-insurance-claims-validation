using InsuranceApp.Services.Dto;
using System.Threading.Tasks;

namespace InsuranceApp.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GetToken(LoginUserDto loginDataDto);
    }
}
