using IMP.Repository.ViewModels.Auth;
using IMP.Service.Helpers;
using IMP.Service.Services.UserSer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtAuthentication _jwtAuth;
        public AuthController(IUserService userService, JwtAuthentication jwtAuth)
        {
            _userService = userService;
            _jwtAuth = jwtAuth;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.Authenticate(request);
            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(string refreshToken)
        {
            var user = await _userService.GetUserByRefreshTokenAsync(refreshToken);

            if (user == null || user.RefreshTokenExpirity < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token");

            var response = _jwtAuth.RefreshTokenAsync(user);

            user.RefreshToken = response.RefreshToken;
            user.RefreshTokenExpirity = DateTime.UtcNow.AddDays(7);
            await _userService.UpdateUserAccount(user);

            return Ok(response);
        }
    }
}
