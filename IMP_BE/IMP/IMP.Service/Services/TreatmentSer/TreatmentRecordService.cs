using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Service.ViewModel.Appointment;
using IMP.Service.ViewModel.ErrorModel;
using IMP.Service.ViewModel.PagingModel;
using IMP.Service.ViewModel.Treatment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.TreatmentSer
{
    public interface ITreatmentRecordService
    {

        Task<ListPagingModel<TreatmentRecord>?> GetTreatments(TreatmentRecordGetAllModel model);
        Task<(bool, List<InputErrorModel>)> CreateTreatmentRecord(TreatmentRecordCreateModel model);
    }
    public class TreatmentRecordService : ITreatmentRecordService
    {
        private readonly UnitOfWork _unitOfWork;

        public TreatmentRecordService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ListPagingModel<TreatmentRecord>?> GetTreatments(TreatmentRecordGetAllModel model)
        {
            var recordList = await _unitOfWork.TreatmentRecordRepo.GetAllWithIncludeAsync([x => x.Booking, x => x.Patient]);

            if (!recordList.Any())
            {
                return null;
            }

            if (model.StartDate != null)
            {
                recordList = recordList.Where(x => x.StartDate >= model.StartDate);
            }

            if (model.EndDate != null)
            {
                recordList = recordList.Where(x => x.EndDate <= model.EndDate);
            }

            recordList = recordList.OrderByDescending(x => x.StartDate);

            // Paging
            var paging = new ListPagingModel<TreatmentRecord>(recordList, model.PageNumber, model.PageSize);

            return paging;

            //foreach (var record in records)
            //{
            //    IEnumerable<Appointment> appointmentList = _unitOfWork.AppointmentRepo.GetAppointmentsByBookingId(record.BookingId);
            //    appointmentList = appointmentList.OrderByDescending(x => x.Date);

            //    record.EndDate
            //}

            throw new NotImplementedException();
        }

        public async Task<(bool, List<InputErrorModel>)> CreateTreatmentRecord(TreatmentRecordCreateModel model)
        {
            var success = true;
            var errorMessages = new List<InputErrorModel>();

            var booking = await _unitOfWork.BookingRepo.GetFirstWithIncludeAsync(x => x.BookingId == x.BookingId, [x => x.Appointments]);
            if (booking == null)
            {
                success = false;
                errorMessages.Add(new InputErrorModel(nameof(model.BookingId), $"No TreatmentBooking with this ID({model.BookingId})"));
            }
            else
            {
                // Check DoctorId
                if (booking.DoctorId != model.DoctorId)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.DoctorId), $"ID provided({model.DoctorId}) differs from ID in booking({booking.DoctorId})."));
                }

                var treatmentRecord = await _unitOfWork.TreatmentRecordRepo.GetFirstWithIncludeAsync(x => x.PatientId == booking.PatientId && x.BookingId == model.BookingId);
                if (treatmentRecord != null)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model), $"Already have an existing TreatmentRecord."));
                }

                // Check left over Appointments
                var leftOver = booking.Appointments.FirstOrDefault(x => !x.Status.Contains(DoneAppointmentModel.Status));
                if (leftOver != null)
                {
                    success = false;
                    errorMessages.Add(new InputErrorModel(nameof(model.BookingId), $"There are still unfinished appointments in the TreatmentBooking."));
                }
            }

            if (!success)
            {
                return (success, errorMessages);
            }

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var lastDate = booking!.Appointments.OrderByDescending(x => x.Date).First().Date;
                var newTreatmentRecord = new TreatmentRecord()
                {
                    PatientId = booking.PatientId,
                    BookingId = booking.BookingId,
                    StartDate = booking.CreatedDate!.Value,
                    EndDate = DateOnly.FromDateTime(lastDate),
                };
                await _unitOfWork.TreatmentRecordRepo.CreateAsync(newTreatmentRecord);
                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitTransactionAsync();

                return (success, errorMessages);
            }
            catch (Exception)
            {
                throw;
            }

            throw new NotImplementedException();
        }
    }
}
