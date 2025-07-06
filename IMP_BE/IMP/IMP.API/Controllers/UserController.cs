using IMP.Repository.ViewModels.User;
using IMP.Service.Services.DoctorSer;
using IMP.Service.Services.PatientSer;
using IMP.Service.Services.UserSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctorRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
    }
}
