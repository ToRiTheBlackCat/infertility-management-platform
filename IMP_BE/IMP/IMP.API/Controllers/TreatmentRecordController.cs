using IMP.Service.Services.TreatmentSer;
using IMP.Service.ViewModel.Treatment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TreatmentRecordController : ControllerBase
    {
        private ITreatmentRecordService _treatmentRecordSer;

        public TreatmentRecordController(ITreatmentRecordService treatmentRecordSer)
        {
            _treatmentRecordSer = treatmentRecordSer;
        }


        [HttpGet]
        [Authorize(Roles = "1")]
        public async Task<IActionResult> GetAllTreamentRecords([FromQuery] TreatmentRecordGetAllModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _treatmentRecordSer.GetTreatments(model);

            return Ok(result);
        }

        [HttpPost("{bookingId}")]
        public async Task<IActionResult> CreateTreatmentRecord([FromBody] TreatmentRecordCreateModel model, int bookingId)
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

            model.BookingId = bookingId;
            var result = await _treatmentRecordSer.CreateTreatmentRecord(model);
            if (!result.Item1)
            {
                foreach (var error in result.Item2)
                {
                    ModelState.AddModelError(error.FieldName, error.ErrorMessage);
                }
                return BadRequest(ModelState);
            }

            return Ok(result);
        }

    }
}
