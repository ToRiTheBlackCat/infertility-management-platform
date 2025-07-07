using IMP.Repository.Base;
using IMP.Repository.Models;
using IMP.Repository.ViewModels.Feedback;
using IMP.Repository.ViewModels.Treatments;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.Service.Services.FeedbackSer
{
    public interface IFeedbackService
    {
        Task<List<Feedback>> GetFeedbackListOfTreatment(int treatmentId);
        Task<Feedback?> GetFeedbackOfBooking(int bookingId);
        Task<(Feedback?, string)> CreateFeedback(CreateFeedbackRequest request);
        Task<(int, string)> UpdateFeedback(int bookingId, UpdateFeedbackRequest request);
    }
    public class FeedbackService : IFeedbackService
    {
        private readonly UnitOfWork _unitOfWork;
        public FeedbackService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Feedback>> GetFeedbackListOfTreatment(int treatmentId)
        {
            var feedbackList = new List<Feedback>();
            try
            {
                feedbackList = await _unitOfWork.FeedbackRepo.GetListFeedbackByTreatmentId(treatmentId);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get list of Feedback");
            }

            return feedbackList;
        }

        public async Task<Feedback?> GetFeedbackOfBooking(int bookingId)
        {
            var feedback = new Feedback();
            try
            {
                var booking = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(bookingId);
                feedback = booking?.Feedbacks.FirstOrDefault();

                return feedback;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to get Feedback of Booking");
            }

            return feedback;
        }

        public async Task<(Feedback?, string)> CreateFeedback(CreateFeedbackRequest request)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var foundBooking = await _unitOfWork.TreatmentBookingRepo.GetByIdWithIncludeAsync(request.BookingId, "BookingId", x => x.Feedbacks);
                if (foundBooking == null || foundBooking.Status != "Đã hoàn thành" || foundBooking.Feedbacks.Any())
                {
                    return (null, "Booking not found or not finished yet or already rated");
                }

                var newFeedback = new Feedback()
                {
                    PatientId = request.PatientId,
                    BookingId = request.BookingId,
                    TreatmentId = request.TreatmentId,
                    TreatmentScore = request.TreatmentScore,
                    DoctorScore = request.DoctorScore,
                    TreatmentComment = request.TreatmentComment,
                    CreateDate = request.CreateDate
                };
                var result = await _unitOfWork.FeedbackRepo.CreateAsync(newFeedback);
                await _unitOfWork.CommitTransactionAsync();

                return (newFeedback, "Feedback successfully");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to create Feedback");
                await _unitOfWork.RollbackTransactionAsync();
                return (null, "Fail to feedback");
            }
        }

        public async Task<(int, string)> UpdateFeedback(int bookingId, UpdateFeedbackRequest request)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();
                var booking = await _unitOfWork.TreatmentBookingRepo.GetByIdAsync(bookingId);

                var foundFeedback = booking?.Feedbacks.FirstOrDefault();
                if (foundFeedback == null)
                {
                    return (0, "Not found any feedback of this booking");
                }

                foundFeedback.TreatmentComment = request.TreatmentComment;
                foundFeedback.CreateDate = request.UpdateDate;

                var result = await _unitOfWork.FeedbackRepo.UpdateAsync(foundFeedback);
                await _unitOfWork.CommitTransactionAsync();

                return (result, "Update successfully");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Fail to Update Feedback of Booking");
                await _unitOfWork.RollbackTransactionAsync();

                return (-1, "Fail to Update Feedback of Booking");
            }
        }
    }
}
