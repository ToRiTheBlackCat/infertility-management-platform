using IMP.Repository.ViewModels.Feedback;
using IMP.Service.Services.FeedbackSer;
using IMP.Service.Services.TreatmentSer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        private readonly ITreatmentBookingService _treatmentBookingService;

        public FeedbackController(IFeedbackService feedbackService, ITreatmentBookingService treatmentBookingService)
        {
            _feedbackService = feedbackService;
            _treatmentBookingService = treatmentBookingService;
        }

        [HttpGet("treatment-{treatmentId}")]
        public async Task<IActionResult> GetFeedbackListOfTreatment(int treatmentId)
        {
            var result = await _feedbackService.GetFeedbackListOfTreatment(treatmentId);
            return Ok(result);
        }

        [HttpGet("booking-{bookingId}")]
        public async Task<IActionResult> GetFeedbackOfBooking(int bookingId)
        {
            var result = await _feedbackService.GetFeedbackOfBooking(bookingId);
            return Ok(result);
        }

        [HttpPost("{bookingId}")]
        public async Task<IActionResult> CreateFeedbackOfBooking([FromBody] CreateFeedbackRequest request)
        {
            var (result,message) = await _feedbackService.CreateFeedback(request);
            return Ok(new
            {
                result,
                message
            });
        }

        [HttpPut("{bookingId}")]
        public async Task<IActionResult> UpdateFeedbackOfBooking([FromBody] UpdateFeedbackRequest request)
        {
            var (result, message ) = await _feedbackService.UpdateFeedback(request.BookingId, request);

            return Ok(new
            {
                result,
                message
            });
        }
    }
}
