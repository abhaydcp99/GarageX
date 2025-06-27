using Microsoft.AspNetCore.Mvc;
using CarServiceBooking.API.Models.DTOs;
using CarServiceBooking.API.Services;

namespace CarServiceBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.RegisterAsync(registerDto);
            if (user == null)
            {
                return BadRequest(new { message = "User with this email already exists" });
            }

            var token = _authService.GenerateJwtToken(user);
            
            return Ok(new
            {
                message = "Registration successful",
                token = token,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    name = user.Name,
                    role = user.Role,
                    phone = user.Phone,
                    address = user.Address
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var token = await _authService.LoginAsync(loginDto);
            if (token == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var user = await _authService.GetUserByEmailAsync(loginDto.Email);
            
            return Ok(new
            {
                message = "Login successful",
                token = token,
                user = new
                {
                    id = user!.Id,
                    email = user.Email,
                    name = user.Name,
                    role = user.Role,
                    phone = user.Phone,
                    address = user.Address
                }
            });
        }
    }
}