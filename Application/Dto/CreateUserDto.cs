using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dto
{
    public class CreateUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
    }
}
