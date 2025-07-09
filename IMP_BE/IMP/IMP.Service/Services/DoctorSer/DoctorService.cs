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

        Task<bool> UpdateDoctorProfile(UpdateDoctorRequest request, Doctor doctor);
        Task<Doctor?> GetDoctorByUserId(int userId);
        Task<List<Doctor>> GetAllDoctor();

    }
    public class DoctorService : IDoctorService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IConfiguration _configure;
        private readonly IWebHostEnvironment _env;

        public DoctorService(UnitOfWork unitOfWork, IConfiguration configure, IWebHostEnvironment env)
        {
            _unitOfWork = unitOfWork;
            _configure = configure;
            _env = env;
        }

        public async Task<List<Doctor>> GetAllDoctor()
        {
            var list = new List<Doctor>();
            try
            {
                list = (await _unitOfWork.DoctorRepo.GetAllAsync()).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while get doctor List");
            }

            return list;
        }

        public async Task<Doctor?> GetDoctorByUserId(int userId)
        {
            try
            {
                return await _unitOfWork.DoctorRepo.GetByIdAsync(userId);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving patient with ID {PatientId}", userId);
                return null;
            }
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

        public async Task<bool> UpdateDoctorProfile(UpdateDoctorRequest request, Doctor doctor)
        {
            try
            {

                await _unitOfWork.BeginTransactionAsync();

                doctor.FullName = request.FullName;
                doctor.YearOfBirth = request.YearOfBirth;
                doctor.PhoneNumber = request.PhoneNumber;
                doctor.Gender = request.Gender;
                doctor.Address = request.Address;
                doctor.Degree = request.Degree;


                var isUpdated = await _unitOfWork.DoctorRepo.UpdateAsync(doctor);
                await _unitOfWork.CommitTransactionAsync();

                if (isUpdated != 1)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Error("Failed to update Doctor profile for userId: {UserId}", doctor.DoctorId);
                    return false;
                }

                return true;
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
