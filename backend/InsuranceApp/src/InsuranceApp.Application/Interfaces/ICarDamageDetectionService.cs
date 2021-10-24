using InsuranceApp.Application.Dto;
using System.Threading.Tasks;

namespace InsuranceApp.Application.Interfaces
{
    public interface ICarDamageDetectionService
    {
        Task<bool> DetectCarDamage(AccidentImageDto accidentImageDto);
    }
}
