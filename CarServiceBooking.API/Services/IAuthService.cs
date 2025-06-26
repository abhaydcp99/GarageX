using CarServiceBooking.API.Models;
using CarServiceBooking.API.Models.DTOs;

namespace CarServiceBooking.API.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto registerDto);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<User?> GetUserByIdAsync(int userId);
        Task<User?> GetUserByEmailAsync(string email);
        string GenerateJwtToken(User user);
    }
}