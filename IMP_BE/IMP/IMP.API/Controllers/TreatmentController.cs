using Azure.Core;
using IMP.Repository.Base;
using IMP.Repository.ViewModels.Treatments;
using IMP.Service.Helpers;
using IMP.Service.Services.TreatmentSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ITreatmentService _treatmentService;
        private readonly IWebHostEnvironment _env;

        public TreatmentController(ITreatmentService treatmentService, IWebHostEnvironment env)
        {
            _treatmentService = treatmentService;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTreatments()
        {
            var result = await _treatmentService.GetTreatmentsList();
            return Ok(result);
        }

        [HttpGet("{treatmentId}")]
        public async Task<IActionResult> GetTreatmentDetail(int treatmentId)
        {
            var result = await _treatmentService.GetTreatmentDetail(treatmentId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> CreateTreament([FromForm] CreateTreatmentRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (ImageHelper.IsValidImageFile(request.TreatmentImage))
            {
                var createdTreatment = await _treatmentService.CreateTreatment(request);
                if (createdTreatment != null)
                {
                    var imageName = ImageHelper.SaveImage(request.TreatmentImage, request.TreatmentImage.FileName, "treatments", _env);
                    createdTreatment.Image = imageName;

                    var result = await _treatmentService.UpdateTreatment(createdTreatment);

                    return Ok();
                }
            }

            return BadRequest();
        }

        [HttpPut("{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateTreatment(int treatmentId, [FromBody] UpdateTreatmentRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var foundTreatment = await _treatmentService.GetTreatmentDetail(treatmentId);
            if (foundTreatment == null)
            {
                return BadRequest();
            }

            if(!string.IsNullOrEmpty(request.TreatmentName)) 
                foundTreatment.TreatmentName = request.TreatmentName;
            if(!string.IsNullOrEmpty(request.Description))
                foundTreatment.Description = request.Description;
            if(request.ExpertFieldId != 0 && request.ExpertFieldId != foundTreatment.ExpertFieldId)
                foundTreatment.ExpertFieldId = request.ExpertFieldId;

            var result = await _treatmentService.UpdateTreatment(foundTreatment);

            return Ok();
        }

        [HttpPut("image-{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateImageOfTreatment(int treatmentId, IFormFile updateImage)
        {
            var foundTreatment = await _treatmentService.GetTreatmentDetail(treatmentId);
            if (foundTreatment == null)
            {
                return BadRequest();
            }

            var imageName = ImageHelper.SaveImage(updateImage, updateImage.FileName, "treatments", _env);
            foundTreatment.Image = imageName;

            var result = await _treatmentService.UpdateTreatment(foundTreatment);

            return Ok();
        }

        [HttpDelete("{treatmentId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> DeleteTreatment(int treatmentId)
        {
            var foundTreatment = await _treatmentService.GetTreatmentDetail(treatmentId);
            if (foundTreatment == null)
            {
                return BadRequest();
            }

            var result = await _treatmentService.DeleteTreatment(foundTreatment);

            return Ok();
        }
    }
}
