using IMP.Repository.Models;
using IMP.Repository.ViewModels.Schedule;
using IMP.Service.Services.ScheduleSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;
        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("{doctorId}")]
        public async Task<IActionResult> GetDoctorSchedule(int doctorId)
        {
            if (doctorId <= 0)
            {
                return BadRequest("Invalid doctor ID.");
            }
            var schedule = await _scheduleService.GetScheduleByDoctorIdAsync(doctorId);
            if (schedule == null)
            {
                return NotFound($"No schedule found for doctor with ID {doctorId}.");
            }
            return Ok(schedule);
        }

        [HttpPost("{doctorId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> CreateSchedule(int doctorId, [FromBody] ScheduleDTO request)
        {
            if (doctorId <= 0)
            {
                return BadRequest("Invalid doctor ID.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdSchedule = await _scheduleService.CreateScheduleAsync(doctorId, request);
            if (createdSchedule == null)
            {
                return BadRequest("Failed to create schedule.");
            }
            return CreatedAtAction(nameof(GetDoctorSchedule), new { doctorId = createdSchedule.DoctorId }, createdSchedule);
        }

        [HttpPut("{doctorId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateSchedule(int doctorId, [FromBody] ScheduleDTO request)
        {
            if (doctorId <= 0)
            {
                return BadRequest("Invalid doctor ID.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedSchedule = await _scheduleService.UpdateScheduleAsync(doctorId, request);
            if (updatedSchedule == null)
            {
                return NotFound($"No schedule found for doctor with ID {doctorId}.");
            }
            return Ok(updatedSchedule);
        }

        [HttpDelete("{doctorId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> DeleteSchedule(int doctorId)
        {
            if (doctorId <= 0)
            {
                return BadRequest("Invalid doctor ID.");
            }
            var isDeleted = await _scheduleService.DeleteScheduleAsync(doctorId);
            if (!isDeleted)
            {
                return NotFound($"No schedule found for doctor with ID {doctorId}.");
            }
            return NoContent(); // Return 204 No Content on successful deletion
        }
    }
}
