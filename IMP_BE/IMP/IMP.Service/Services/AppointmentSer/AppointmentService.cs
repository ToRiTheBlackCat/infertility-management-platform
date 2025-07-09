using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.Repos;
using IMP.Service.ViewModel.Appointment;
using IMP.Service.ViewModel.ErrorModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.AppointmentSer
{
    public interface IAppointmentService
    {
        List<Appointment> GetAppointmentsByBookingId(int bookingId);
        Appointment? GetAppointment(int appointmentId);
        Task<(bool, List<InputErrorModel>)> CreateAppointment(CreateAppointmentModel model);
        Task<(bool, List<InputErrorModel>)> UpdateAppointment(UpdateAppointmentModel model);
        Task<(bool, List<InputErrorModel>)> CheckDoneAppointment(DoneAppointmentModel model);
        Task<(bool, List<InputErrorModel>)> DeleteAppointment(DeleteAppointmentModel model);
    }
    public class AppointmentService : IAppointmentService
    {
        private readonly UnitOfWork _unitOfWork;
        public AppointmentService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<Appointment> GetAppointmentsByBookingId(int bookingId)
        {
            var appointments = _unitOfWork.AppointmentRepo.GetAppointmentsByBookingId(bookingId)
                .OrderByDescending(x => x.Date)
                .ToList();

            appointments.ForEach(x =>
            {
                x.Booking = null;
            });

            return appointments;
        }

        public Appointment? GetAppointment(int appointmentId)
        {
            return _unitOfWork.AppointmentRepo.GetById(appointmentId);
        }

        public async Task<(bool, List<InputErrorModel>)> CreateAppointment(CreateAppointmentModel model)
        {
            bool success = true;
            List<InputErrorModel> errorMessages = new List<InputErrorModel>();

            var booking = _unitOfWork.BookingRepo.GetById(model.BookingId!.Value);
            if (booking == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.BookingId), $"No TreatmentBooking with this ID({model.BookingId})"));
            }
            else
            {
                if (booking.PatientId != model.PatientId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.PatientId), $"ID provided({model.PatientId}) differs from ID in booking({booking.PatientId})"));
                }

                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId}) differs from ID in booking({booking.DoctorId})"));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            // Create appointment
            var newAppointment = new Appointment()
            {
                AppointmentId = _unitOfWork.AppointmentRepo.GetNewId(),
                BookingId = model.BookingId!.Value,
                Date = model.Date!.Value,
                Note = model.Note,
                PatientId = model.PatientId!.Value,
                Status = CreateAppointmentModel.Status
            };

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                _unitOfWork.AppointmentRepo.Create(newAppointment);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> UpdateAppointment(UpdateAppointmentModel model)
        {
            bool success = true;
            List<InputErrorModel> errorMessages = new List<InputErrorModel>();

            var appointment = _unitOfWork.AppointmentRepo.GetById(model.AppointmentId!.Value);
            if (appointment == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.AppointmentId), $"No Appointment with this ID({model.AppointmentId})"));

                return (success, errorMessages);
            }
            else
            {
                var booking = _unitOfWork.BookingRepo.GetById(appointment.BookingId)!;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId}) differs from ID in booking({booking.DoctorId})"));
                }

                var daysDifference = (DateTime.Now - appointment.Date).Days;
                if (daysDifference >= -UpdateAppointmentModel.ValidUpdateDateRange)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model), $"Can't update Appointment when it is within 3 days from now."));
                }
            }

            if (!success)
            {
                return (false, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                appointment.Note = model.Note;
                appointment.Date = model.Date!.Value;
                await _unitOfWork.AppointmentRepo.UpdateAsync(appointment);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> CheckDoneAppointment(DoneAppointmentModel model)
        {
            bool success = true;
            List<InputErrorModel> errorMessages = new List<InputErrorModel>();

            var appointment = _unitOfWork.AppointmentRepo.GetById(model.AppointmentId!.Value);
            if (appointment == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.AppointmentId), $"No Appointment with this ID({model.AppointmentId})"));
            }
            else
            {
                var booking = _unitOfWork.BookingRepo.GetById(appointment.BookingId)!;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId}) differs from ID in booking({booking.DoctorId})"));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                appointment.Status = DoneAppointmentModel.Status;
                await _unitOfWork.AppointmentRepo.UpdateAsync(appointment);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<(bool, List<InputErrorModel>)> DeleteAppointment(DeleteAppointmentModel model)
        {
            bool success = true;
            List<InputErrorModel> errorMessages = new List<InputErrorModel>();

            var appointment = _unitOfWork.AppointmentRepo.GetById(model.AppointmentId!.Value);
            if (appointment == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.AppointmentId), $"No Appointment with this ID({model.AppointmentId})"));
            }
            else
            {
                var booking = _unitOfWork.BookingRepo.GetById(appointment.BookingId)!;
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId}) differs from ID in booking({booking.DoctorId})"));
                }

                var daysDifference = (DateTime.Now - appointment.Date).Days;
                if (daysDifference >= -UpdateAppointmentModel.ValidUpdateDateRange)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model), $"Can't delete Appointment when it is within 3 days from now."));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                await _unitOfWork.AppointmentRepo.RemoveAsync(appointment);
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
