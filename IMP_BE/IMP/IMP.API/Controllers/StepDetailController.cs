using IMP.Service.Services.AppointmentSer;
using IMP.Service.Services.TreatmentSer;
using IMP.Service.ViewModel.StepDetail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StepDetailController : ControllerBase
    {
        private readonly IStepDetailService _stepDetailService;

        public StepDetailController(IStepDetailService stepDetailService)
        {
            _stepDetailService = stepDetailService;
        }

        [HttpGet("{appointmentId}")]
        public async Task<IActionResult> GetDoctorAppointmentsByBookingId(int appointmentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _stepDetailService.GetStepDetailsByAppointmentId(appointmentId);

            return Ok(result);
        }

        [HttpPost("doctor/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> CreateStepDetail([FromBody] StepDetailCreateModel model, int appointmentId)
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
            var result = await _stepDetailService.CreateStepDetail(model);
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

        [HttpPut("doctor/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> UpdateStepDetail([FromBody] StepDetailUpdateModel model, int appointmentId)
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
            var result = await _stepDetailService.UpdateStepDetail(model);
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


        [HttpPut("doctor/done/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> CheckDoneStepDetail([FromBody] StepDetailCheckDoneModel model, int appointmentId)
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
            var result = await _stepDetailService.CheckDoneStepDetail(model);
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

        [HttpDelete("doctor/{appointmentId}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> DeleteStepDetail([FromBody] StepDetailDeleteModel model, int appointmentId)
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
            var result = await _stepDetailService.DeleteStepDetail(model);
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
