using IMP.Repository.Models;
using IMP.Repository.ViewModels.TreatmentBooking;
using IMP.Service.Services.TreatmentSer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentBookingController : ControllerBase
    {
        private readonly ITreatmentBookingService _Serv;

        public TreatmentBookingController(ITreatmentBookingService serv)
        {
            _Serv = serv;
        }

        [HttpGet("/api/Admin/TreatmentBooking")]
        public async Task<IActionResult> Get(int pageNum, int pageSize)
        {
            try
            {
                var result = await _Serv.GetAllWithPaging(pageNum, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpGet("patient-treatments/{patientId}")]
        public async Task<IActionResult> GetDetailByPatient(int patientId)
        {
            try
            {
                var result = await _Serv.GetDetailsByPatient(patientId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }
        
        [HttpGet("doctor-treatments/{doctorId}")]
        public async Task<IActionResult> GetDetailByDoctor(int doctorId)
        {
            try
            {
                var result = await _Serv.GetDetailsByDoctor(doctorId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }
        
        [HttpGet("{bookingId}")]
        public async Task<IActionResult> GetDetail(int bookingId)
        {
            try
            {
                var result = await _Serv.GetDetails(bookingId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTreatmentBooking form)
        {
            try
            {
                var result = await _Serv.Create(form);
                return result.status.Contains("Failure")
                    ? Problem(title: "Booking creation failed",
                              statusCode: StatusCodes.Status400BadRequest,
                              detail: result.status)
                    : Ok(new
                    {
                        Message = result.status,
                        Object = result.view
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost("cancel/{bookingId}")]
        public async Task<IActionResult> Cancel(int bookingId)
        {
            try
            {
                var result = await _Serv.Cancel(bookingId);
                return result.status.Contains("Failure")
                    ? Problem(title: "Booking cancellation failed",
                              statusCode: StatusCodes.Status400BadRequest,
                              detail: result.status)
                    : Ok(new
                    {
                        Message = result.status,
                        Object = result.view
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }
    }
}
