using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.User;
using IMP.Service.Helpers;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.PatientSer
{
    public interface IPatientService
    {
        Task<(bool,string)> SignUpPatient(RegisterPatientRequest request, User user);
        Task<bool> UpdatePatientProfile(UpatePatientRequest request, string userId);
        Task<Patient?> GetPatientByUserId(string userId);
    }
    public class PatientService : IPatientService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IConfiguration _configure;
        public PatientService(UnitOfWork unitOfWork, IConfiguration configure)
        {
            _unitOfWork = unitOfWork;
            _configure = configure;
        }
        public async Task<(bool, string)> SignUpPatient(RegisterPatientRequest request, User user)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                //Create new Patient
                var newPatient = new Patient()
                {
                    PatientId = user.UserId,
                    FullName = request.FullName,
                    DateOfBirth = request.DateOfBirth,
                    Gender = request.Gender,
                    PhoneNumber = request.PhoneNumber,
                    Address = request.Address
                };
                var isCreated = await _unitOfWork.PatientRepo.CreateAsync(newPatient);
                await _unitOfWork.CommitTransactionAsync();

                //If create successfully
                if (isCreated == 1)
                {
                    return (true, "Create Patient account success");
                }

                return (false, "Create Patient account fail");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return (false, "Error when create Patient account");
            }
        }

        public async Task<bool> UpdatePatientProfile(UpatePatientRequest request, string userId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var user = await _unitOfWork.UserRepo.GetByIdAsync(int.Parse(userId));
                if (user == null)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Information("Patient with ID {UserId} not found", userId);
                    return false;
                }
                var patient = await _unitOfWork.PatientRepo.GetPatientByUserId(int.Parse(userId));
                patient.FullName = request.FullName;
                patient.DateOfBirth = request.DateOfBirth;
                patient.Gender = request.Gender;
                patient.PhoneNumber = request.PhoneNumber;
                patient.Address = request.Address;
                await _unitOfWork.UserRepo.UpdateAsync(user);
                var isUpdated = await _unitOfWork.PatientRepo.UpdateAsync(patient);
                await _unitOfWork.CommitTransactionAsync();
                if (isUpdated == 0)
                {
                    await _unitOfWork.RollbackTransactionAsync();
                    Log.Information("Failed to update patient profile for user ID {UserId}", userId);
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred while updating patient profile");
                await _unitOfWork.RollbackTransactionAsync();
                return false;
            }
            finally
            {
                await _unitOfWork.CommitTransactionAsync();
                Log.Information("Patient profile updated successfully for user ID {UserId}", userId);
            }
        }

        public async Task<Patient?> GetPatientByUserId(string userId)
        {
            try
            {
                return await _unitOfWork.PatientRepo.GetPatientByUserId(int.Parse(userId));
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving patient with ID {PatientId}", userId);
                return null;
            }
        }
    }
}
