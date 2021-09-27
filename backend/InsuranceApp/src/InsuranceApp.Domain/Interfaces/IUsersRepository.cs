using InsuranceApp.Domain.Entities;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IUsersRepository
    {
        Task<User> GetUser(string userId);
        Task<User> AddUser(User newUser);
    }
}
