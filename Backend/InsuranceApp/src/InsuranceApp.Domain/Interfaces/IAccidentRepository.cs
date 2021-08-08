using InsuranceApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceApp.Domain.Interfaces
{
    public interface IAccidentRepository
    {
        Task<Accident> GetAccident(int id);
        Task<List<Accident>> GetAccidents();
        Task<Accident> AddAccident(Accident newAccident);
    }
}
