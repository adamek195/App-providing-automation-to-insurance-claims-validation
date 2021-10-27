using System.IO;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface IDocumentsService
    {
        Task<byte[]> CreateGuiltyPartyAccidentDocument(string userId, int accidentId);
        Task CreateUserAccidentDocument(string userId, int accidentId);
    }
}
