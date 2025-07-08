using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Service.ViewModel.Appointment;
using IMP.Service.ViewModel.ErrorModel;
using IMP.Service.ViewModel.StepDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.TreatmentSer
{
    public interface IStepDetailService
    {
        Task<List<StepDetail>> GetStepDetailsByAppointmentId(int appointmentId);
        StepDetail? GetStepDetail(int stepId);
        Task<(bool, List<InputErrorModel>)> CreateStepDetail(StepDetailCreateModel model);
        Task<(bool, List<InputErrorModel>)> UpdateStepDetail(StepDetailUpdateModel model);
        Task<(bool, List<InputErrorModel>)> CheckDoneStepDetail(StepDetailCheckDoneModel model);
        Task<(bool, List<InputErrorModel>)> DeleteStepDetail(StepDetailDeleteModel model);
    }
    public class StepDetailService : IStepDetailService
    {
        private readonly UnitOfWork _unitOfWork;

        public StepDetailService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<StepDetail>> GetStepDetailsByAppointmentId(int appointmentId)
        {
            var stepDetails = await _unitOfWork.StepDetailRepo.GetAllWithIncludeAsync(x => x.Step);
            if (stepDetails == null)
            {
                return new List<StepDetail>();
            }

            return stepDetails.Where(x => x.AppointmentId == appointmentId).ToList();
        }

        public StepDetail? GetStepDetail(int stepId)
        {
            var stepDetail = _unitOfWork.StepDetailRepo.GetById(stepId);
            return stepDetail;
        }

        public async Task<(bool, List<InputErrorModel>)> CreateStepDetail(StepDetailCreateModel model)
        {
            var success = true;
            var errorMessages = new List<InputErrorModel>();

            var appointment = _unitOfWork.AppointmentRepo.GetById(model.AppointmentId);
            if (appointment == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.AppointmentId), $"No Appointment exist with this ID({model.AppointmentId})"));
            }
            else
            {
                // Check DoctorId
                var booking = _unitOfWork.BookingRepo.GetById(appointment.BookingId)!;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId} differs from ID in booking({booking.DoctorId})."));
                }

                var stepDetail = _unitOfWork.StepDetailRepo
                    .GetAllAsync().Result
                    .FirstOrDefault(x => x.StepId == model.StepId && x.AppointmentId == model.AppointmentId);
                if (stepDetail != null)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.StepId), $"A StepDetail already exist with this (StepId, AppointmentID): ({stepDetail.StepId}, {stepDetail.AppointmentId})"));
                }
            }

            var treatmentStep = _unitOfWork.TreatmentStepRepo.GetById(model.StepId);
            if (treatmentStep == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.StepId), $"No TreatmentStep exist with this ID({model.StepId})"));
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var newStep = new StepDetail()
                {
                    StepId = model.StepId,
                    Description = model.Description,
                    Status = StepDetailCreateModel.Status,
                    AppointmentId = model.AppointmentId,
                };
                await _unitOfWork.StepDetailRepo.CreateAsync(newStep);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> UpdateStepDetail(StepDetailUpdateModel model)
        {
            var success = true;
            var errorMessages = new List<InputErrorModel>();

            var stepDetail = _unitOfWork.StepDetailRepo.GetAllAsync().Result
                .FirstOrDefault(x => x.StepId == model.StepId && x.AppointmentId == model.AppointmentId);
            if (stepDetail == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.StepId), $"No StepDetail exist with this (StepId, AppointmentID): ({model.StepId}, {model.AppointmentId})"));
            }
            else
            {
                // Check DoctorId
                var appointment = await _unitOfWork.AppointmentRepo
                    .GetFirstWithIncludeAsync(x => x.AppointmentId == stepDetail.AppointmentId, [x => x.Booking]);
                var booking = appointment!.Booking;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId} differs from ID in booking({booking.DoctorId})."));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                stepDetail!.Description = model.Description;
                await _unitOfWork.StepDetailRepo.UpdateAsync(stepDetail);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> CheckDoneStepDetail(StepDetailCheckDoneModel model)
        {
            var success = true;
            var errorMessages = new List<InputErrorModel>();

            var stepDetail = _unitOfWork.StepDetailRepo.GetAllAsync().Result
                .FirstOrDefault(x => x.StepId == model.StepId && x.AppointmentId == model.AppointmentId);
            if (stepDetail == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.StepId), $"No StepDetail exist with this (StepId, AppointmentID): ({model.StepId}, {model.AppointmentId})"));
            }
            else
            {
                // Check DoctorId
                var appointment = await _unitOfWork.AppointmentRepo
                    .GetFirstWithIncludeAsync(x => x.AppointmentId == stepDetail.AppointmentId, [x => x.Booking]);
                var booking = appointment!.Booking;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId} differs from ID in booking({booking.DoctorId})."));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                stepDetail!.Status = StepDetailCheckDoneModel.Status;
                await _unitOfWork.StepDetailRepo.UpdateAsync(stepDetail);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> DeleteStepDetail(StepDetailDeleteModel model)
        {
            var success = true;
            var errorMessages = new List<InputErrorModel>();

            var stepDetail = _unitOfWork.StepDetailRepo.GetAllAsync().Result
                .FirstOrDefault(x => x.StepId == model.StepId && x.AppointmentId == model.AppointmentId);
            if (stepDetail == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.StepId), $"No StepDetail exist with this (StepId, AppointmentID): ({model.StepId}, {model.AppointmentId})"));
            }
            else
            {
                // Check DoctorId
                var appointment = await _unitOfWork.AppointmentRepo
                    .GetFirstWithIncludeAsync(x => x.AppointmentId == stepDetail.AppointmentId, [x => x.Booking]);
                var booking = appointment!.Booking;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId} differs from ID in booking({booking.DoctorId})."));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                await _unitOfWork.StepDetailRepo.RemoveAsync(stepDetail);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
