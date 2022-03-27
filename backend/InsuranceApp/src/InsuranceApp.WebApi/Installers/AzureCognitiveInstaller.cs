using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using InsuranceApp.Application.Configuration;

namespace InsuranceApp.WebApi.Installers
{
    public class AzureCognitiveInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            var azureCognitiveServiceSettings = new AzureCognitiveServiceSettings();
            Configuration.GetSection("AzureCognitiveServiceSettings").Bind(azureCognitiveServiceSettings);
            services.AddTransient(x => azureCognitiveServiceSettings);
        }
    }
}
