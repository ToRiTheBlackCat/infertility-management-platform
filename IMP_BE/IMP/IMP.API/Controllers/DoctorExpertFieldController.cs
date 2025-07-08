using IMP.Repository.Models;
using IMP.Repository.ViewModels.DoctorExpertField;
using IMP.Service.Services.ExpertFieldSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Authorize(Roles = "3")]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorExpertFieldController : ControllerBase
    {
        private readonly IDoctorExpertFieldService _Serv;

        public DoctorExpertFieldController(IDoctorExpertFieldService serv)
        {
            _Serv = serv;
        }

        [HttpGet("{doctorId}")]
        public async Task<IActionResult> GetDetail(int doctorId, int expertFieldId)
        {
            try
            {
                var result = await _Serv.GetDetails(doctorId, expertFieldId);
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
        public async Task<IActionResult> Create([FromBody] CreateDoctorExpertField form)
        {
            try
            {
                var result = await _Serv.Create(form);
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

        [HttpPatch("{doctorId}")]
        public async Task<IActionResult> UpdateComment(int doctorId, int oldExpertFieldId, int newExpertFieldId)
        {
            try
            {
                var result = await _Serv.Update(doctorId, oldExpertFieldId, newExpertFieldId);
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
        public async Task<IActionResult> Delete(int doctorId, int expertFieldId)
        {
            try
            {
                var result = await _Serv.Delete(doctorId, expertFieldId);
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