using IMP.Repository.ViewModels.ExpertField;
using IMP.Service.Services.ExpertFieldSer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertFieldController : ControllerBase
    {
        private readonly IExpertFieldService _expertFieldService;

        public ExpertFieldController(IExpertFieldService serv)
        {
            _expertFieldService = serv;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _expertFieldService.GetAll();
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            try
            {
                var result = await _expertFieldService.GetDetails(id);
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
        public async Task<IActionResult> Create(string expertFieldName)
        {
            try
            {
                var result = await _expertFieldService.Create(expertFieldName);
                return result.status.Contains("Failure")
                    ? Problem(title: "Expert field creation failed",
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, string name)
        {
            try
            {
                var result = await _expertFieldService.Update(id, name);
                return result.status.Contains("Failure")
                    ? Problem(title: "Expert field creation failed",
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _expertFieldService.Delete(id);
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
