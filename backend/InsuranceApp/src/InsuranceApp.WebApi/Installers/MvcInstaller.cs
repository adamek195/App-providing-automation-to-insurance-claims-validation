using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using InsuranceApp.Application.Mappings;
using InsuranceApp.WebApi.Filters;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Application.Services;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Repositories;

namespace InsuranceApp.WebApi.Installers
{
    public class MvcInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IPoliciesService, PoliciesService>();
            services.AddTransient<IPoliciesRepository, PoliciesRepository>();
            services.AddTransient<IUserAccidentsService, UserAccidentsService>();
            services.AddTransient<IUserAccidentsRepository, UserAccidentsRepository>();
            services.AddTransient<IGuiltyPartyAccidentsRepository, GuiltyPartyAccidentsRepository>();
            services.AddTransient<IGuiltyPartyAccidentsService, GuiltyPartyAccidentsService>();
            services.AddTransient<ICarDamageDetectionService, CarDamageDetectionService>();

            services.AddSingleton(AutoMapperConfig.Initialize());

            services.AddMvc(options =>
            {
                options.Filters.Add(new GlobalExceptionFilter());
            });

            services.AddCors();
            services.AddControllers();
        }
    }
}
