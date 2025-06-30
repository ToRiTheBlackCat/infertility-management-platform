using IMP.Repository.Models;
using IMP.Repository.ViewModels.Token;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Helpers
{
    public class JwtAuthentication
    {
        private readonly IConfiguration _configure;
        public JwtAuthentication(IConfiguration configure)
        {
            _configure = configure;
        }

        public string GenerateAccessToken(User user)
        {
            var jwtSecretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configure["Jwt:SecretKey"] ?? ""));
            var credential = new SigningCredentials(jwtSecretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _configure["JWT:Issuer"],
                audience: _configure["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credential
                );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            return accessToken;
        }

        public string GenerateRefreshToken()
        {
            var bytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }

        public RefreshTokenResponse RefreshTokenAsync(User user)
        {
            var newAccessToken = GenerateAccessToken(user);
            var newRefreshToken = GenerateRefreshToken();

            return new RefreshTokenResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }
    }

}
