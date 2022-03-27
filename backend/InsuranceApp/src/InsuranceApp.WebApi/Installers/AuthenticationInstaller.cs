using System.Text;
using Microsoft.IdentityModel.Tokens;
using InsuranceApp.Domain.Entities;
using InsuranceApp.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace InsuranceApp.WebApi.Installers
{
    public class AuthenticationInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddIdentityCore<User>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<InsuranceAppContext>();

            var key = Encoding.ASCII.GetBytes(Configuration["JwtToken:Key"]);

            services.AddAuthentication(options =>
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidIssuer = Configuration["JwtToken:TokenIssuer"],
                        ValidateAudience = false,
                        RequireExpirationTime = true
                    };
                });
        }
    }
}
