using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private static readonly List<User> _users = new List<User>()
        {
            new User()
            {
                Id = 0,
                FirstName = "Robert",
                LastName = "Lewandowski",
                Email = "rober@onet.pl"
            },
            new User()
            {
                Id = 1,
                FirstName = "Kamil",
                LastName = "Glik",
                Email = "kamil@wp.pl"
            }
        };

        public List<User> GetAllUsers()
        {
            return _users;
        }

        public User CreateUser(User user)
        {
            _users.Add(user);
            return user;
        }
    }
}
