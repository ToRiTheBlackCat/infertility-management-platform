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
    }
}
