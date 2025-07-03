using Azure.Core;
using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.Auth;
using IMP.Service.Helpers;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LoginRequest = IMP.Repository.ViewModels.Auth.LoginRequest;

namespace IMP.Service.Services.UserSer
{
    public interface IUserService
    {
        Task<LoginResponse> Authenticate(LoginRequest loginRequest);
        Task<User?> SignUpUser(string email, string password, int roleId);
    }
    public class UserServices : IUserService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly JwtAuthentication _jwtAuthen;
        private readonly IConfiguration _configure;
        public UserServices(UnitOfWork unitOfWork, JwtAuthentication jwtAuthen, IConfiguration configure)
        {
            _unitOfWork = unitOfWork;
            _jwtAuthen = jwtAuthen;
            _configure = configure;
        }
        public async Task<LoginResponse> Authenticate(LoginRequest loginRequest)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                //Encoding the password
                var hashedPassword = Sha256Encoding.ComputeSHA256Hash(loginRequest.Password + _configure["SecretString"] ?? "");

                //Find existed user
                var foundUser = await _unitOfWork.UserRepo.GetAccountAsync(loginRequest.Email, hashedPassword);
                if (foundUser == null)
                {
                    Log.Information("Not found any user with {@LoginRequest}", loginRequest);
                    return new LoginResponse();
                }

                //Generate token
                var accessToken = _jwtAuthen.GenerateAccessToken(foundUser);
                var refreshToken = _jwtAuthen.GenerateRefreshToken();
                foundUser.RefreshToken = refreshToken;
                foundUser.RefreshTokenExpirity = DateTime.UtcNow.AddDays(7);

                //Save the expire date of refresh token to that found user
                await _unitOfWork.UserRepo.UpdateAsync(foundUser);
                await _unitOfWork.CommitTransactionAsync();

                //Initialize the response model
                var loginResponse = new LoginResponse()
                {
                    UserId = foundUser.UserId.ToString(),
                    RoleId = foundUser.RoleId.ToString(),
                    RoleName = foundUser.Role.RoleName.Trim(),
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                };

                return loginResponse;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return new LoginResponse();
            }
        }

        public async Task<User?> SignUpUser(string email, string password, int roleId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                //Encoding the password
                var hashedPassword = Sha256Encoding.ComputeSHA256Hash(password + _configure["SecretString"] ?? "");

                //Create new user
                var newUser = new User()
                {
                    Email = email,
                    Password = hashedPassword,
                    CreatedDate = DateTime.UtcNow,
                    RoleId = roleId,
                    IsActive = true,
                };
                var isCreated = await _unitOfWork.UserRepo.CreateAsync(newUser);
                await _unitOfWork.CommitTransactionAsync();

                //If create successfully
                if (isCreated == 1)
                {
                    var createdUser = await _unitOfWork.UserRepo.GetFirstWithIncludeAsync(
                                                x => x.UserId == newUser.UserId,
                                                x => x.Role);

                    return createdUser;
                }

                return new User();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return new User();
            }
        }
    }
}
