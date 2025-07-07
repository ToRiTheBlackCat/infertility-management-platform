using Azure.Core;
using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.Repos;
using IMP.Repository.ViewModels.Treatments;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.TreatmentSer
{
    public interface ITreatmentService
    {
        Task<List<Treatment>> GetTreatmentsList();
        Task<Treatment?> GetTreatmentDetail(int treatmentId);
        Task<Treatment?> CreateTreatment(CreateTreatmentRequest request);
        Task<int> UpdateTreatment(Treatment treatment);
        Task<bool> DeleteTreatment(Treatment treatment);

    }
    public class TreatmentService : ITreatmentService
    {
        private readonly UnitOfWork _unitOfWork;
        public TreatmentService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Treatment?> GetTreatmentDetail(int treatmentId)
        {
            var treatment = new Treatment();
            try
            {
                treatment = await _unitOfWork.TreatmentRepo.GetByIdWithIncludeAsync(treatmentId, "TreatmentId", x => x.ExpertField);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get detail Treatment");
            }

            return treatment;
        }

        public async Task<List<Treatment>> GetTreatmentsList()
        {
            var treatmentsList = new List<Treatment>();
            try
            {
                treatmentsList = (await _unitOfWork.TreatmentRepo.GetAllWithIncludeAsync(x => x.ExpertField)).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get list of Treatment");
            }

            return treatmentsList;
        }

        public async Task<Treatment?> CreateTreatment(CreateTreatmentRequest request)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var createTreatment = new Treatment()
                {
                    TreatmentName = request.TreatmentName,
                    Description = request.Description,
                    ExpertFieldId = request.ExpertFieldId,
                };
                var result = await _unitOfWork.TreatmentRepo.CreateAsync(createTreatment);
                await _unitOfWork.CommitTransactionAsync();
                if (result == 1)
                {
                    var treatment = await _unitOfWork.TreatmentRepo.GetByIdAsync(createTreatment.TreatmentId);

                    return treatment;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Create new Treatment");
                await _unitOfWork.RollbackTransactionAsync();
            }

            return null;
        }

        public async Task<int> UpdateTreatment(Treatment treatment)
        {
            var result = 0;
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var canModify = await CanModify(treatment);
                if (!canModify)
                {
                    return 0;
                }

                result = await _unitOfWork.TreatmentRepo.UpdateAsync(treatment);
                await _unitOfWork.CommitTransactionAsync();

            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to Update Treatment");
                await _unitOfWork.RollbackTransactionAsync();
            }

            return result;
        }

        public async Task<bool> DeleteTreatment(Treatment treatment)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var canModify = await CanModify(treatment);
                if (!canModify)
                {
                    return false;
                }

                var result = await _unitOfWork.TreatmentRepo.RemoveAsync(treatment);
                await _unitOfWork.CommitTransactionAsync();

                return result;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Delete Treatment");
                await _unitOfWork.RollbackTransactionAsync();
                return false;
            }
        }

        private async Task<bool> CanModify(Treatment treatment)
        {
            var treatmentRelative = await _unitOfWork.TreatmentRepo.GetByIdWithIncludeAsync(treatment.TreatmentId, "TreatmentId", x => x.TreatmentBookings);

            if (treatmentRelative?.TreatmentBookings.Count != 0)
                return false;

            return true;
        }
    }
}