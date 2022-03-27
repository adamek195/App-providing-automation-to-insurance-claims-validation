using InsuranceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InsuranceApp.WebApi.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<InsuranceAppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("InsuranceAppCS")));
        }
    }
}
