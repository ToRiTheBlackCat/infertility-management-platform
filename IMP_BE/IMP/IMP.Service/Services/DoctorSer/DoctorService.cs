using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.User;
using IMP.Service.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.DoctorSer
{
    public interface IDoctorService
    {
        Task<(bool, string)> SignUpDoctor(RegisterDoctorRequest request, User user);

        Task<bool> UpdateDoctorProfile(UpdateDoctorRequest request, string userId);

    }
    public class DoctorService : IDoctorService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IConfiguration _configure;
        private readonly IWebHostEnvironment _env;

        public DoctorService(UnitOfWork unitOfWork, IConfiguration configure,IWebHostEnvironment env)
        {
            _unitOfWork = unitOfWork;
            _configure = configure;
            _env = env;
        }
        public async Task<(bool, string)> SignUpDoctor(RegisterDoctorRequest request, User user)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var imageName = ImageHelper.SaveImage(request.DoctorImage, request.DoctorImage.FileName, "doctors", _env);

                //Create new Patient
                var newDoctor = new Doctor()
                {
                    DoctorId = user.UserId,
                    FullName = request.FullName,
                    AvatarImage = imageName,
                    YearOfBirth = request.YearOfBirth,
                    PhoneNumber = request.PhoneNumber,
                    Gender = request.Gender,
                    Address = request.Address,
                    Degree = request.Degree,
                    Status = "Valid"
                };
                var isCreated = await _unitOfWork.DoctorRepo.CreateAsync(newDoctor);
                await _unitOfWork.CommitTransactionAsync();

                //If create successfully
                if (isCreated == 1)
                {
                    return (true, "Create Doctor account success");
                }

                return (false, "Create Doctor account fail");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return (false, "Error when create Doctor account");
            }
        }

        public async Task<bool> UpdateDoctorProfile(UpdateDoctorRequest request, string userId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var doc = await _unitOfWork.DoctorRepo.GetDoctorByUserId(int.Parse(userId));
                if (doc == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Error("Doctor not found with userId: {UserId}", userId);
                    return false;
                }
                doc.AvatarImage = request.AvatarImage;
                doc.FullName = request.FullName;
                doc.YearOfBirth = request.YearOfBirth;
                doc.PhoneNumber = request.PhoneNumber;
                doc.Gender = request.Gender;
                doc.Address = request.Address;
                doc.Degree = request.Degree;
                doc.AverageScore = request.AverageScore;
                doc.Status = request.Status;
                var isUpdated = await _unitOfWork.DoctorRepo.UpdateAsync(doc);
                if (isUpdated == 1)
                {
                    await _unitOfWork.CommitTransactionAsync();
                    return true;
                }
                else
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Error("Failed to update Doctor profile for userId: {UserId}", userId);
                    return false;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return false;
            }
        }
    }
}
