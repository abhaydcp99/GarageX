using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CarServiceBooking.API.Data;
using CarServiceBooking.API.Models;
using CarServiceBooking.API.Models.DTOs;

namespace CarServiceBooking.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            IQueryable<Booking> query = _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Customer)
                .Include(b => b.Provider);

            // Filter based on user role
            switch (userRole)
            {
                case "customer":
                    query = query.Where(b => b.CustomerId == userId);
                    break;
                case "provider":
                    query = query.Where(b => b.ProviderId == userId);
                    break;
                case "admin":
                    // Admin can see all bookings
                    break;
                default:
                    return Forbid();
            }

            var bookings = await query.Select(b => new
            {
                id = b.Id,
                serviceId = b.ServiceId,
                serviceName = b.Service.Name,
                customerId = b.CustomerId,
                customerName = b.Customer.Name,
                customerEmail = b.Customer.Email,
                customerPhone = b.Customer.Phone,
                providerId = b.ProviderId,
                providerName = b.Provider.Name,
                bookingDate = b.BookingDate.ToString("yyyy-MM-dd"),
                bookingTime = b.BookingTime,
                status = b.Status,
                totalAmount = b.TotalAmount,
                paymentStatus = b.PaymentStatus,
                customerAddress = b.CustomerAddress,
                specialInstructions = b.SpecialInstructions,
                createdAt = b.CreatedAt
            }).OrderByDescending(b => b.createdAt).ToListAsync();

            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var booking = await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Customer)
                .Include(b => b.Provider)
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();

            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" });
            }

            // Check if user has permission to view this booking
            if (userRole != "admin" && booking.CustomerId != userId && booking.ProviderId != userId)
            {
                return Forbid();
            }

            var result = new
            {
                id = booking.Id,
                serviceId = booking.ServiceId,
                serviceName = booking.Service.Name,
                customerId = booking.CustomerId,
                customerName = booking.Customer.Name,
                customerEmail = booking.Customer.Email,
                customerPhone = booking.Customer.Phone,
                providerId = booking.ProviderId,
                providerName = booking.Provider.Name,
                bookingDate = booking.BookingDate.ToString("yyyy-MM-dd"),
                bookingTime = booking.BookingTime,
                status = booking.Status,
                totalAmount = booking.TotalAmount,
                paymentStatus = booking.PaymentStatus,
                customerAddress = booking.CustomerAddress,
                specialInstructions = booking.SpecialInstructions,
                createdAt = booking.CreatedAt
            };

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "customer")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDto bookingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");



            var service = await _context.Services.FindAsync(bookingDto.ServiceId);
            if (service == null)
            {
                return BadRequest(new { message = "Service not found" });
            }

            if (!service.IsActive)
            {
                return BadRequest(new { message = "Service is not available" });
            }

            var booking = new Booking
            {
                ServiceId = bookingDto.ServiceId,
                CustomerId = userId,
                ProviderId = service.ProviderId,
                BookingDate = bookingDto.BookingDate,
                BookingTime = bookingDto.BookingTime,
                Status = "pending",
                TotalAmount = service.Price,
                PaymentStatus = "pending",
                CustomerAddress = bookingDto.CustomerAddress,
                SpecialInstructions = bookingDto.SpecialInstructions,
                CreatedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Simulate payment processing (in real app, integrate with payment gateway)
            booking.PaymentStatus = "paid";
            booking.Status = "confirmed";
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, new
            {
                id = booking.Id,
                serviceId = booking.ServiceId,
                customerId = booking.CustomerId,
                providerId = booking.ProviderId,
                bookingDate = booking.BookingDate.ToString("yyyy-MM-dd"),
                bookingTime = booking.BookingTime,
                status = booking.Status,
                totalAmount = booking.TotalAmount,
                paymentStatus = booking.PaymentStatus,
                customerAddress = booking.CustomerAddress,
                specialInstructions = booking.SpecialInstructions,
                createdAt = booking.CreatedAt
            });
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "provider,admin")]
        public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] UpdateBookingStatusDto statusDto)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Check if user has permission to update this booking
            if (userRole != "admin" && booking.ProviderId != userId)
            {
                return Forbid();
            }

            booking.Status = statusDto.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Booking status updated", status = booking.Status });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "customer,admin")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Check if user has permission to cancel this booking
            if (userRole != "admin" && booking.CustomerId != userId)
            {
                return Forbid();
            }

            // Only allow cancellation if booking is pending or confirmed
            if (booking.Status != "pending" && booking.Status != "confirmed")
            {
                return BadRequest(new { message = "Cannot cancel booking in current status" });
            }

            booking.Status = "cancelled";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Booking cancelled successfully" });
        }
    }

    public class UpdateBookingStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}