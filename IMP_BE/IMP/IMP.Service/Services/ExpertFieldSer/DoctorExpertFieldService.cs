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

        Task<DoctorExpertFieldView> GetDetails(int doctorId);

        Task<(string status, DoctorExpertField view)> Create(CreateDoctorExpertField form);

        Task<(string status, DoctorExpertField view)> Update(int doctorId, int oldExpertFieldId, int newExpertFieldId);

        Task<string> Delete(int doctorId, int expertFieldId);
    }

    public class DoctorExpertFieldService : IDoctorExpertFieldService
    {
        private readonly UnitOfWork _unitOfWork;

        public DoctorExpertFieldService(UnitOfWork uOW)
        {
            _unitOfWork = uOW;
        }

        public async Task<(string status, DoctorExpertField view)> Create(CreateDoctorExpertField form)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                DoctorExpertField mapped = new DoctorExpertField();
                mapped.ExpertFieldId = form.ExpertFieldId;
                mapped.DoctorId = form.DoctorId;

                var result = await _unitOfWork.DoctorExpertFieldRepo.CreateAsync(mapped);

                await _unitOfWork.CommitTransactionAsync();

                if (result > 0)
                    return ("Success: Create successfully", mapped);
                return ("Failure: Creation unsuccessful", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return ("Failure: Error when creating new field.", null);
            }
        }

        public async Task<string> Delete(int doctorId, int expertFieldId)
        {
            try
            {
                var existing = await _unitOfWork.DoctorExpertFieldRepo.GetAsync(doctorId, expertFieldId);
                if (existing == null)
                    return "Failure: This object Id doesn't exist in the database";

                await _unitOfWork.BeginTransactionAsync();

                var result = await _unitOfWork.DoctorExpertFieldRepo.RemoveAsync(existing);

                await _unitOfWork.CommitTransactionAsync();

                if (result)
                    return "Success: Remove successfully";
                return "Failure: Removal unsuccessful";
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return "Failure: Error when deleting field.";
            }
        }

        public async Task<DoctorExpertFieldView> GetDetails(int doctorId)
        {
            var doctor = await _unitOfWork.DoctorRepo.GetByIdWithIncludeAsync(doctorId, "DoctorId", x => x.DoctorExpertField);
            if (doctor == null || doctor.DoctorExpertField == null)
            {
                return new DoctorExpertFieldView();
            }

            var result = await _unitOfWork.DoctorExpertFieldRepo.GetAsync(doctorId, doctor.DoctorExpertField.ExpertFieldId);
            if(result == null)
            {
                return new DoctorExpertFieldView();
            }

            var mapped = new DoctorExpertFieldView();

            mapped.DoctorExpertFieldId = result.ExpertFieldId;
            mapped.ExpertFieldName = result.ExpertField.ExpertFieldName;
            mapped.DoctorId = doctor.DoctorId;
            mapped.DoctorName = doctor.FullName;

            return mapped;
        }

        public async Task<(string status, DoctorExpertField view)> Update(int doctorId, int oldExpertFieldId, int newExpertFieldId)
        {
            try
            {
                var existing = await _unitOfWork.DoctorExpertFieldRepo.GetAsync(doctorId, oldExpertFieldId);

                if (existing == null)
                    return ("Failure: This object doesn't exist in the database", null);

                await _unitOfWork.BeginTransactionAsync();

                DoctorExpertField mapped = new DoctorExpertField();
                mapped.ExpertFieldId = newExpertFieldId;
                mapped.DoctorId = doctorId;

                var result = await _unitOfWork.DoctorExpertFieldRepo.UpdateAsync(mapped);

                await _unitOfWork.CommitTransactionAsync();

                if (result > 0)
                    return ("Successful!", mapped);
                return ("Failure: Update unsuccessfull", mapped);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return ("Failure: Error when updating new field.", null);
            }
        }
    }
}