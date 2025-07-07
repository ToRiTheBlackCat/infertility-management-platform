using Azure.Core;
using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.Treatments;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.TreatmentSer
{
    public interface ITreatmentStepService
    {
        Task<List<TreatmentStep>?> GetTreatmentStepListByTreatmentId(int treatmentId);
        Task<TreatmentStep?> CreateTreatmentStep(CreateTreatmentStepRequest request);
        Task<int> UpdateTreatmentStep(UpdateTreatmentStepRequest request);
        Task<bool> DeleteTreatmentStep(int stepId);
        Task<bool> DeleteListOfTreatmentStep(int treatmentId);

    }
    public class TreatmentStepService : ITreatmentStepService
    {
        private readonly UnitOfWork _unitOfWork;
        public TreatmentStepService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TreatmentStep?> CreateTreatmentStep(CreateTreatmentStepRequest request)
        {
            var newStep = new TreatmentStep();
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                newStep.TreatmentId = request.TreatmentId;
                newStep.Description = request.Description;

                var result = await _unitOfWork.TreatmentStepRepo.CreateAsync(newStep);
                await _unitOfWork.CommitTransactionAsync();

                if (result == 1)
                {
                    var treatmentStep = await _unitOfWork.TreatmentStepRepo.GetByIdAsync(newStep.StepId);
                    return treatmentStep;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Create new TreatmentStep");
                await _unitOfWork.RollbackTransactionAsync();
            }

            return null;
        }

        public async Task<bool> DeleteListOfTreatmentStep(int treatmentId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var foundTreatment = await _unitOfWork.TreatmentRepo.GetByIdWithIncludeAsync(treatmentId, "TreatmentId", x => x.TreatmentSteps);
                if (foundTreatment == null)
                {
                    return false;
                }

                var stepList = foundTreatment?.TreatmentSteps.ToList();
                if(stepList != null && stepList.Count != 0)
                {
                    foreach (var item in stepList)
                    {
                        await _unitOfWork.TreatmentStepRepo.RemoveAsync(item);
                    }

                    await _unitOfWork.CommitTransactionAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to Delete List of TreatmentStep");
                return false;
            }
        }

        public async Task<bool> DeleteTreatmentStep(int stepId)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var foundStep = await _unitOfWork.TreatmentStepRepo.GetByIdAsync(stepId);
                if (foundStep != null)
                {
                    var result = await _unitOfWork.TreatmentStepRepo.RemoveAsync(foundStep);
                    await _unitOfWork.CommitTransactionAsync();

                    return result;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Update Treatment");
            }

            return false;
        }

        public async Task<List<TreatmentStep>?> GetTreatmentStepListByTreatmentId(int treatmentId)
        {
            var stepsList = new List<TreatmentStep>();
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                stepsList = await _unitOfWork.TreatmentStepRepo.GetStepsListWithTreatmentId(treatmentId);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Get List of Treatment");
            }
            return stepsList;
        }

        public async Task<int> UpdateTreatmentStep(UpdateTreatmentStepRequest request)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var foundStep = await _unitOfWork.TreatmentStepRepo.GetByIdAsync(request.StepId);
                if (foundStep != null)
                {
                    var canModify = await CanModify(foundStep);
                    if (!canModify)
                    {
                        return 0;
                    }

                    foundStep.Description = request.Description;

                    var result = await _unitOfWork.TreatmentStepRepo.UpdateAsync(foundStep);
                    await _unitOfWork.CommitTransactionAsync();

                    return result;
                }
                return 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Update Treatment");
                return -1;
            }
        }

        private async Task<bool> CanModify(TreatmentStep treatmentStep)
        {
            var stepRelative = await _unitOfWork.TreatmentStepRepo.GetByIdWithIncludeAsync(treatmentStep.StepId, "StepId", x => x.StepDetail);

            if (stepRelative?.StepDetail != null)
                return false;

            return true;
        }
    }
}
