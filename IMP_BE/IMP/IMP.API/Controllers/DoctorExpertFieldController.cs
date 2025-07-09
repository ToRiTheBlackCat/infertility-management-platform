using IMP.Repository.Models;
using IMP.Repository.ViewModels.DoctorExpertField;
using IMP.Service.Services.ExpertFieldSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    //[Authorize(Roles = "3")]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorExpertFieldController : ControllerBase
    {
        private readonly IDoctorExpertFieldService _doctorExpertFieldService;

        public DoctorExpertFieldController(IDoctorExpertFieldService serv)
        {
            _doctorExpertFieldService = serv;
        }

        [HttpGet("{doctorId}")]
        public async Task<IActionResult> GetDetail(int doctorId)
        {
            try
            {
                var result = await _doctorExpertFieldService.GetDetails(doctorId);
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

        [HttpPost]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> Create([FromBody] CreateDoctorExpertField form)
        {
            try
            {
                var result = await _doctorExpertFieldService.Create(form);
                return result.status.Contains("Failure")
                    ? Problem(title: "Docter expert field creation failed",
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

        [HttpPut("{doctorId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> Update(int doctorId, int oldExpertFieldId, int newExpertFieldId)
        {
            try
            {
                var result = await _doctorExpertFieldService.Update(doctorId, oldExpertFieldId, newExpertFieldId);
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

        [HttpDelete("{doctorId}")]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> Delete(int doctorId, int expertFieldId)
        {
            try
            {
                var result = await _doctorExpertFieldService.Delete(doctorId, expertFieldId);
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
    }
}