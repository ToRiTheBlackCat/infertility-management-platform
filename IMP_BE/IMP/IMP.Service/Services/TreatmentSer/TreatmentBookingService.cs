using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.ExpertField;
using IMP.Repository.ViewModels.TreatmentBooking;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.TreatmentSer
{
    public interface ITreatmentBookingService
    {
        Task<List<TreatmentBooking>> GetAllWithPaging(int pageNum, int pageSize);
        Task<List<TreatmentBooking>> GetDetailsByPatient(int patientId);
        Task<List<TreatmentBooking>> GetDetailsByDoctor(int doctorId);
        Task<TreatmentBooking> GetDetails(int bookingId);
        Task<(string status, TreatmentBooking view)> Create(CreateTreatmentBooking form);
        Task<(string status, TreatmentBooking view)> Cancel(int id);
    }
    public class TreatmentBookingService : ITreatmentBookingService
    {
        private readonly UnitOfWork _uOW;

        public TreatmentBookingService(UnitOfWork uOW)
        {
            _uOW = uOW;
        }

        public async Task<(string status, TreatmentBooking view)> Cancel(int id)
        {
            try
            {
                var existing = await _uOW.TreatmentBookingRepo.GetByIdAsync(id);

                if (existing == null)
                    return ("Failure: This object Id doesn't exist in the database", null);

                await _uOW.BeginTransactionAsync();

                existing.Status = "cancel";

                var result = await _uOW.TreatmentBookingRepo.UpdateAsync(existing);

                await _uOW.CommitTransactionAsync();

                if (result > 0)
                    return ("Successful!", existing);
                return ("Failure: Update unsuccessfull", existing);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _uOW.RollbackTransactionAsync();
                return ("Failure: Error when updating new field.", null);
            }
        }

        public async Task<(string status, TreatmentBooking view)> Create(CreateTreatmentBooking form)
        {
            try
            {
                await _uOW.BeginTransactionAsync();

                var count = _uOW.TreatmentBookingRepo.Count();

                TreatmentBooking mapped = new TreatmentBooking();
                //mapped.BookingId = count + 1;
                mapped.PatientId = form.PatientId;
                mapped.DoctorId = form.DoctorId;
                mapped.TreatmentId = form.TreatmentId;
                mapped.Status = "pending".Trim();
                DateTime today = DateTime.UtcNow;
                mapped.CreatedDate = DateOnly.FromDateTime(today);

                var result = await _uOW.TreatmentBookingRepo.CreateAsync(mapped);

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

        public async Task<List<TreatmentBooking>> GetAllWithPaging(int pageNum, int pageSize)
        {
            var result = await _uOW.TreatmentBookingRepo.GetAllWithPaging(pageNum, pageSize);
            return result.ToList();
        }

        public async Task<TreatmentBooking> GetDetails(int bookingId)
        {
            var result = await _uOW.TreatmentBookingRepo.GetByIdAsync(bookingId);
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByDoctor(int doctorId)
        {
            var result = await _uOW.TreatmentBookingRepo.GetDetailsByDoctor(doctorId);
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByPatient(int patientId)
        {
            var result = await _uOW.TreatmentBookingRepo.GetDetailsByPatient(patientId);
            return result;
        }
    }
}
