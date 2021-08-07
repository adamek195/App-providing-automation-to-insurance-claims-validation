using InsuranceApp.Services.Dto;
using InsuranceApp.Services.Interfaces;
using InsuranceApp.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text;
using System;

namespace InsuranceApp.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> GetToken(LoginUserDto loginDataDto)
        {
            var user = await _userManager.FindByNameAsync(loginDataDto.UserName);
            if (user == null)
                throw new Exception("Wrong User Name! Please check user details and try again.");

            var passwordCorrect = await _userManager.CheckPasswordAsync(user, loginDataDto.PasswordHash);
            if (!passwordCorrect)
                throw new Exception("Wrong Password! Please check user details and try again.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtToken:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(
                    _configuration.GetValue<int>("JwtToken:ExpirationMinutes")),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateEncodedJwt(tokenDescriptor);

            return token;
        }
    }
}
