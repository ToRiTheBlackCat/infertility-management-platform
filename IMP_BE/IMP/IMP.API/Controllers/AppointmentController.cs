using IMP.Repository.ViewModels.User;
using IMP.Service.Services.AppointmentSer;
using IMP.Service.ViewModel.Appointment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("doctor-appointment/{bookingId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetDoctorAppointmentsByBookingId(int bookingId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _appointmentService.GetAppointmentsByBookingId(bookingId);

            return Ok(result);
        }

        [HttpGet("patient-appointment/{bookingId}")]
        [Authorize(Roles = "4")]
        public async Task<IActionResult> GetPatientAppointmentsByBookingId(int bookingId)
        {
            return await GetDoctorAppointmentsByBookingId(bookingId);
        }

        [HttpGet("{appointmentId}")]
        public async Task<IActionResult> GetAppointmentById(int appointmentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appointment = _appointmentService.GetAppointment(appointmentId);
            if (appointment == null)
            {
                return NotFound();
            }
            return Ok(appointment);
        }

        [HttpPost("doctor-appointment")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> CreateAppointment([FromBody] CreateAppointmentModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set DoctorId 
            var identifier = User.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            if (identifier != null)
            {
                model.DoctorId = int.Parse(identifier.Value);
            }

            var result = await _appointmentService.CreateAppointment(model);
            if (!result.Item1)
            {
                foreach (var error in result.Item2)
                {
                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPut("doctor-appointment/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> UpdateAppointment([FromBody] UpdateAppointmentModel model, int appointmentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set DoctorId 
            var identifier = User.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            if (identifier != null)
            {
                model.DoctorId = int.Parse(identifier.Value);
            }

            model.AppointmentId = appointmentId;
            var result = await _appointmentService.UpdateAppointment(model);
            if (!result.Item1)
            {
                foreach (var error in result.Item2)
                {
                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPut("doctor-appointment/done/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> CheckDoneAppointment([FromBody] DoneAppointmentModel model, int appointmentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set DoctorId 
            var identifier = User.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            if (identifier != null)
            {
                model.DoctorId = int.Parse(identifier.Value);
            }

            model.AppointmentId = appointmentId;
            var result = await _appointmentService.CheckDoneAppointment(model);
            if (!result.Item1)
            {
                foreach (var error in result.Item2)
                {
                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpDelete("doctor-appointment/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> DeleteAppointment([FromBody] DeleteAppointmentModel model, int appointmentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set DoctorId 
            var identifier = User.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            if (identifier != null)
            {
                model.DoctorId = int.Parse(identifier.Value);
            }

            model.AppointmentId = appointmentId;
            var result = await _appointmentService.DeleteAppointment(model);
            if (!result.Item1)
            {
                foreach (var error in result.Item2)
                {
                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}
