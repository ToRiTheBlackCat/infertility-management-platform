using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.DoctorExpertField;
using IMP.Repository.ViewModels.ExpertField;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.ExpertFieldSer
{
    public interface IDoctorExpertFieldService
    {

        Task<DoctorExpertFieldView> GetDetails(int doctorId, int expertFieldId);

        Task<(string status, DoctorExpertField view)> Create(CreateDoctorExpertField form);

        Task<(string status, DoctorExpertField view)> Update(int doctorId, int oldExpertFieldId, int newExpertFieldId);

        Task<string> Delete(int doctorId, int expertFieldId);
    }

    public class DoctorExpertFieldService : IDoctorExpertFieldService
    {
        private readonly UnitOfWork _uOW;

        public DoctorExpertFieldService(UnitOfWork uOW)
        {
            _uOW = uOW;
        }

        public async Task<(string status, DoctorExpertField view)> Create(CreateDoctorExpertField form)
        {
            try
            {
                await _uOW.BeginTransactionAsync();

                DoctorExpertField mapped = new DoctorExpertField();
                mapped.ExpertFieldId = form.ExpertFieldId;
                mapped.DoctorId = form.DoctorId;

                var result = await _uOW.DoctorExpertFieldRepo.CreateAsync(mapped);

                await _uOW.CommitTransactionAsync();

                if (result > 0)
                    return ("Success: Create successfully", mapped);
                return ("Failure: Creation unsuccessful", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return ("Failure: Error when creating new field.", null);
            }
        }

        public async Task<string> Delete(int doctorId, int expertFieldId)
        {
            try
            {
                var existing = await _uOW.DoctorExpertFieldRepo.GetAsync(doctorId, expertFieldId);
                if (existing == null)
                    return "Failure: This object Id doesn't exist in the database";

                await _uOW.BeginTransactionAsync();

                var result = await _uOW.DoctorExpertFieldRepo.RemoveAsync(existing);

                await _uOW.CommitTransactionAsync();

                if (result)
                    return "Success: Remove successfully";
                return "Failure: Removal unsuccessful";
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return "Failure: Error when deleting field.";
            }
        }

        public async Task<DoctorExpertFieldView> GetDetails(int doctorId, int expertFieldId)
        {
            var result = await _uOW.DoctorExpertFieldRepo.GetAsync(doctorId, expertFieldId);

            var mapped = new DoctorExpertFieldView();
            mapped.ExpertFieldName = result.ExpertField.ExpertFieldName;
            mapped.AvatarImage = result.Doctor.AvatarImage;
            mapped.FullName = result.Doctor.FullName;
            mapped.YearOfBirth = result.Doctor.YearOfBirth;
            mapped.PhoneNumber = result.Doctor.PhoneNumber;
            mapped.Gender = result.Doctor.Gender;
            mapped.Address = result.Doctor.Address;
            mapped.Degree = result.Doctor.Degree;
            mapped.AverageScore = result.Doctor.AverageScore;
            mapped.Status = result.Doctor.Status;

            return mapped;
        }

        public async Task<(string status, DoctorExpertField view)> Update(int doctorId, int oldExpertFieldId, int newExpertFieldId)
        {
            try
            {
                var existing = await _uOW.DoctorExpertFieldRepo.GetAsync(doctorId, oldExpertFieldId);

                if (existing == null)
                    return ("Failure: This object doesn't exist in the database", null);

                await _uOW.BeginTransactionAsync();

                DoctorExpertField mapped = new DoctorExpertField();
                mapped.ExpertFieldId = newExpertFieldId;
                mapped.DoctorId = doctorId;

                var result = await _uOW.DoctorExpertFieldRepo.UpdateAsync(mapped);

                await _uOW.CommitTransactionAsync();

                if (result > 0)
                    return ("Successful!", mapped);
                return ("Failure: Update unsuccessfull", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return ("Failure: Error when updating new field.", null);
            }
        }
    }
}