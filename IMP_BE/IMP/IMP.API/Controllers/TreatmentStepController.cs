using IMP.Repository.Models;
using IMP.Repository.ViewModels.Treatments;
using IMP.Service.Services.TreatmentSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentStepController : ControllerBase
    {
        private readonly ITreatmentStepService _treatmentStepService;
        public TreatmentStepController(ITreatmentStepService treatmentStepService)
        {
            _treatmentStepService = treatmentStepService;
        }

        [HttpGet("{treatmentId}")]
        public async Task<IActionResult> GetStepListByTreatmentId(int treatmentId)
        {
            var result = await _treatmentStepService.GetTreatmentStepListByTreatmentId(treatmentId);
            return Ok(result);
        }

        [HttpPost("{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> CreateStepOfTreatment([FromBody] CreateTreatmentStepRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _treatmentStepService.CreateTreatmentStep(request);
            return Ok(result);
        }

        [HttpPut("{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateStepOfTreatment([FromBody] UpdateTreatmentStepRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _treatmentStepService.UpdateTreatmentStep(request);
            if (result == 0)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> DeleteStepOfTreatment([FromForm]int stepId)
        {
            var result = await _treatmentStepService.DeleteTreatmentStep(stepId);

            return Ok(result ?"Deleted" :"Failed");
        }

        [HttpDelete("{treatmentId}/all-steps")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> DeleteAllStepOfTreatment(int treatmentId)
        {
            var result = await _treatmentStepService.DeleteListOfTreatmentStep(treatmentId);


            return Ok(result ? "Deleted" : "Failed");
        }
    }
}
