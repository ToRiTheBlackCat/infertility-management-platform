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
        Task<(string status, TreatmentBooking view)> MarkDone(int id);

    }
    public class TreatmentBookingService : ITreatmentBookingService
    {
        private readonly UnitOfWork _unitOfWork;

        public TreatmentBookingService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<(string status, TreatmentBooking view)> Cancel(int id)
        {
            try
            {
                var existing = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(id);

                if (existing == null)
                    return ("Failure: This object Id doesn't exist in the database", null);

                await _unitOfWork.BeginTransactionAsync();

                existing.Status = "Đã Hủy";

                var result = await _unitOfWork.TreatmentBookingRepo.UpdateAsync(existing);

                await _unitOfWork.CommitTransactionAsync();

                if (result > 0)
                    return ("Successful!", existing);
                return ("Failure: Update unsuccessfull", existing);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return ("Failure: Error when updating new field.", null);
            }
        }

        public async Task<(string status, TreatmentBooking view)> Create(CreateTreatmentBooking form)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var count = _unitOfWork.TreatmentBookingRepo.Count();

                TreatmentBooking mapped = new TreatmentBooking();

                mapped.PatientId = form.PatientId;
                mapped.DoctorId = form.DoctorId;
                mapped.TreatmentId = form.TreatmentId;
                mapped.Status = "Đang chờ".Trim();
                DateTime today = DateTime.UtcNow;
                mapped.CreatedDate = DateOnly.FromDateTime(today);

                var result = await _unitOfWork.TreatmentBookingRepo.CreateAsync(mapped);

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

        public async Task<List<TreatmentBooking>> GetAllWithPaging(int pageNum, int pageSize)
        {
            var result = await _unitOfWork.TreatmentBookingRepo.GetAllWithPaging(pageNum, pageSize);
            return result.ToList();
        }

        public async Task<TreatmentBooking> GetDetails(int bookingId)
        {
            var result = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(bookingId);
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByDoctor(int doctorId)
        {
            var result = await _unitOfWork.TreatmentBookingRepo.GetDetailsByDoctor(doctorId);
            return result;
        }

        public async Task<List<TreatmentBooking>> GetDetailsByPatient(int patientId)
        {
            var result = await _unitOfWork.TreatmentBookingRepo.GetDetailsByPatient(patientId);
            return result;
        }

        public async Task<(string status, TreatmentBooking view)> MarkDone(int id)
        {
            try
            {
                var existing = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(id);

                if (existing == null)
                    return ("Failure: This object Id doesn't exist in the database", null);

                await _unitOfWork.BeginTransactionAsync();

                existing.Status = "Đã Hoàn Thành";

                var result = await _unitOfWork.TreatmentBookingRepo.UpdateAsync(existing);

                await _unitOfWork.CommitTransactionAsync();

                var booking = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(id);

                if (result > 0)
                    return ("Successful!", booking);
                return ("Failure: Mark done unsuccessfull", existing);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An unexpected error occurred");
                await _unitOfWork.RollbackTransactionAsync();
                return ("Failure: Error when mark done new field.", null);
            }
        }
    }
}
