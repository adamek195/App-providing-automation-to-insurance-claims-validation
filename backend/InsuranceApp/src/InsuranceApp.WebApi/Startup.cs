using InsuranceApp.Domain.Entities;
using InsuranceApp.Domain.Interfaces;
using InsuranceApp.Infrastructure.Data;
using InsuranceApp.Infrastructure.Repositories;
using InsuranceApp.Application.Interfaces;
using InsuranceApp.Application.Mappings;
using InsuranceApp.Application.Services;
using InsuranceApp.Application.Configuration;
using InsuranceApp.WebApi.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace InsuranceApp.WebApi
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
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
            services.AddTransient<IDocumentsService, DocumentsService>();

            services.AddSingleton(AutoMapperConfig.Initialize());

            services.AddMvc(options =>
            {
                options.Filters.Add(new GlobalExceptionFilter());
            });

            services.AddCors();
            services.AddControllers();

            services.AddDbContext<InsuranceAppContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("InsuranceAppCS")));

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

            var azureCognitiveServiceSettings = new AzureCognitiveServiceSettings();
            Configuration.GetSection("AzureCognitiveServiceSettings").Bind(azureCognitiveServiceSettings);
            services.AddTransient(x => azureCognitiveServiceSettings);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            );

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
