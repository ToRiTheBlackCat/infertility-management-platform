using IMP.Repository.ViewModels.User;
using IMP.Service.Helpers;
using IMP.Service.Services.DoctorSer;
using IMP.Service.Services.PatientSer;
using IMP.Service.Services.UserSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPatientService _patientService;
        private readonly IDoctorService _dotorService;

        public UserController(IUserService userService, IPatientService patientService, IDoctorService dotorService)
        {
            _userService = userService;
            _patientService = patientService;
            _dotorService = dotorService;
        }

        [HttpPost("register-patient")]
        public async Task<IActionResult> RegisterPatient([FromBody] RegisterPatientRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdUser = await _userService.SignUpUser(request.Email, request.Password, 4);
            if (createdUser == null)
            {
                return BadRequest();
            }

            var (isCreated, message) = await _patientService.SignUpPatient(request, createdUser);

            return Ok(new
            {
                isCreated,
                message
            });
        }

        [Authorize(Roles = "2")]
        [HttpPost("register-doctor")]
        public async Task<IActionResult> RegisterDoctor([FromForm] RegisterDoctorRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!ImageHelper.IsValidImageFile(request.DoctorImage))
            {
                return BadRequest();
            }

            var createdUser = await _userService.SignUpUser(request.Email, request.Password, 3);
            if (createdUser == null)
            {
                return BadRequest();
            }

            var (isCreated, message) = await _dotorService.SignUpDoctor(request, createdUser);

            return Ok(new
            {
                isCreated,
                message
            });
        }

        [HttpPut("patient/update-profile")]
        public async Task<IActionResult> UpdatePatientProfile([FromBody] UpatePatientRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            var updated = await _patientService.UpdatePatientProfile(request, userId);
            if (!updated)
            {
                return BadRequest("Failed to update profile");
            }
            return Ok("Profile updated successfully");
        }

        [HttpPut("doctor/update-profile")]
        public async Task<IActionResult> UpdateDoctorProfile([FromBody] UpdateDoctorRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            var updated = await _dotorService.UpdateDoctorProfile(request, userId);
            if (!updated)
            {
                return BadRequest("Failed to update profile");
            }
            return Ok("Profile updated successfully");
        }

        // <summary>
        // Get the patient profile of the currently authenticated user. FOR TESTING AND DEVELOPMENT PURPOSES ONLY/ MAYBE
        // </summary>
        [HttpGet("patient/profile")]
        public async Task<IActionResult> GetPatientProfile()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            var patientProfile = await _patientService.GetPatientByUserId (userId);
            if (patientProfile == null)
            {
                return NotFound("Patient profile not found");
            }
            return Ok(patientProfile);
        }
    }
}
