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
                if(isCreated == 1)
                {
                    return (true, "Create Patient account success");
                }

                return (false, "Create Patient account fail");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return (false,"Error when create Patient account");
            }
        }
    }
}
