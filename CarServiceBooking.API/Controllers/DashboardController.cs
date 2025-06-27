using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CarServiceBooking.API.Data;

namespace CarServiceBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            switch (userRole)
            {
                case "admin":
                    return await GetAdminStats();
                case "provider":
                    return await GetProviderStats(userId);
                case "customer":
                    return await GetCustomerStats(userId);
                default:
                    return Forbid();
            }
        }

        private async Task<IActionResult> GetAdminStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalServices = await _context.Services.CountAsync();
            var totalBookings = await _context.Bookings.CountAsync();
            var totalRevenue = await _context.Bookings
                .Where(b => b.Status != "cancelled")
                .SumAsync(b => b.TotalAmount);

            var recentBookings = await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Customer)
                .Include(b => b.Provider)
                .OrderByDescending(b => b.CreatedAt)
                .Take(10)
                .Select(b => new
                {
                    id = b.Id,
                    serviceName = b.Service.Name,
                    customerName = b.Customer.Name,
                    providerName = b.Provider.Name,
                    bookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                    status = b.Status,
                    totalAmount = b.TotalAmount
                })
                .ToListAsync();

            return Ok(new
            {
                totalUsers,
                totalServices,
                totalBookings,
                totalRevenue,
                recentBookings
            });
        }

        private async Task<IActionResult> GetProviderStats(int providerId)
        {
            var totalServices = await _context.Services
                .Where(s => s.ProviderId == providerId)
                .CountAsync();

            var activeServices = await _context.Services
                .Where(s => s.ProviderId == providerId && s.IsActive)
                .CountAsync();

            var totalBookings = await _context.Bookings
                .Where(b => b.ProviderId == providerId)
                .CountAsync();

            var totalRevenue = await _context.Bookings
                .Where(b => b.ProviderId == providerId && b.Status != "cancelled")
                .SumAsync(b => b.TotalAmount);

            var recentBookings = await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Customer)
                .Where(b => b.ProviderId == providerId)
                .OrderByDescending(b => b.CreatedAt)
                .Take(10)
                .Select(b => new
                {
                    id = b.Id,
                    serviceName = b.Service.Name,
                    customerName = b.Customer.Name,
                    bookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                    status = b.Status,
                    totalAmount = b.TotalAmount
                })
                .ToListAsync();

            return Ok(new
            {
                totalServices,
                activeServices,
                totalBookings,
                totalRevenue,
                recentBookings
            });
        }

        private async Task<IActionResult> GetCustomerStats(int customerId)
        {
            var totalBookings = await _context.Bookings
                .Where(b => b.CustomerId == customerId)
                .CountAsync();

            var upcomingBookings = await _context.Bookings
                .Where(b => b.CustomerId == customerId && 
                           (b.Status == "confirmed" || b.Status == "pending"))
                .CountAsync();

            var completedBookings = await _context.Bookings
                .Where(b => b.CustomerId == customerId && b.Status == "completed")
                .CountAsync();

            var totalSpent = await _context.Bookings
                .Where(b => b.CustomerId == customerId && b.Status != "cancelled")
                .SumAsync(b => b.TotalAmount);

            var recentBookings = await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Provider)
                .Where(b => b.CustomerId == customerId)
                .OrderByDescending(b => b.CreatedAt)
                .Take(10)
                .Select(b => new
                {
                    id = b.Id,
                    serviceName = b.Service.Name,
                    providerName = b.Provider.Name,
                    bookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                    status = b.Status,
                    totalAmount = b.TotalAmount
                })
                .ToListAsync();

            return Ok(new
            {
                totalBookings,
                upcomingBookings,
                completedBookings,
                totalSpent,
                recentBookings
            });
        }
    }
}