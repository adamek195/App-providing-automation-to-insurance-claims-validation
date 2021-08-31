using InsuranceApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IUsersRepository
    {
        Task<User> AddUser(User newUser);
        Task<bool> SignIn(User loginUser);
    }
}
