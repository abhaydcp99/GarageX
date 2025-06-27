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
    public class ServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetServices([FromQuery] string? category = null, [FromQuery] decimal? minPrice = null, [FromQuery] decimal? maxPrice = null)
        {
            var query = _context.Services.Include(s => s.Provider).AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(s => s.Category.ToLower() == category.ToLower());
            }

            if (minPrice.HasValue)
            {
                query = query.Where(s => s.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(s => s.Price <= maxPrice.Value);
            }

            var services = await query.Select(s => new
            {
                id = s.Id,
                name = s.Name,
                description = s.Description,
                price = s.Price,
                duration = s.Duration,
                category = s.Category,
                providerId = s.ProviderId,
                providerName = s.Provider.Name,
                imageUrl = s.ImageUrl,
                isActive = s.IsActive,
                createdAt = s.CreatedAt
            }).ToListAsync();

            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _context.Services
                .Include(s => s.Provider)
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    id = s.Id,
                    name = s.Name,
                    description = s.Description,
                    price = s.Price,
                    duration = s.Duration,
                    category = s.Category,
                    providerId = s.ProviderId,
                    providerName = s.Provider.Name,
                    imageUrl = s.ImageUrl,
                    isActive = s.IsActive,
                    createdAt = s.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (service == null)
            {
                return NotFound(new { message = "Service not found" });
            }

            return Ok(service);
        }

        [HttpPost]
        [Authorize(Roles = "provider,admin")]
        public async Task<IActionResult> CreateService([FromBody] ServiceDto serviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // If admin, they can create service for any provider
            // If provider, they can only create service for themselves
            var providerId = userId;
            if (userRole == "admin")
            {
                // For admin, we'll use the current user as provider for simplicity
                // In a real app, you might want to specify the provider in the DTO
                providerId = userId;
            }

            var service = new Service
            {
                Name = serviceDto.Name,
                Description = serviceDto.Description,
                Price = serviceDto.Price,
                Duration = serviceDto.Duration,
                Category = serviceDto.Category,
                ProviderId = providerId,
                ImageUrl = serviceDto.ImageUrl,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetService), new { id = service.Id }, new
            {
                id = service.Id,
                name = service.Name,
                description = service.Description,
                price = service.Price,
                duration = service.Duration,
                category = service.Category,
                providerId = service.ProviderId,
                imageUrl = service.ImageUrl,
                isActive = service.IsActive,
                createdAt = service.CreatedAt
            });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "provider,admin")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceDto serviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound(new { message = "Service not found" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Check if user has permission to update this service
            if (userRole != "admin" && service.ProviderId != userId)
            {
                return Forbid();
            }

            service.Name = serviceDto.Name;
            service.Description = serviceDto.Description;
            service.Price = serviceDto.Price;
            service.Duration = serviceDto.Duration;
            service.Category = serviceDto.Category;
            service.ImageUrl = serviceDto.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = service.Id,
                name = service.Name,
                description = service.Description,
                price = service.Price,
                duration = service.Duration,
                category = service.Category,
                providerId = service.ProviderId,
                imageUrl = service.ImageUrl,
                isActive = service.IsActive,
                createdAt = service.CreatedAt
            });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "provider,admin")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound(new { message = "Service not found" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Check if user has permission to delete this service
            if (userRole != "admin" && service.ProviderId != userId)
            {
                return Forbid();
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Service deleted successfully" });
        }

        [HttpPatch("{id}/toggle-status")]
        [Authorize(Roles = "provider,admin")]
        public async Task<IActionResult> ToggleServiceStatus(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound(new { message = "Service not found" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            // Check if user has permission to update this service
            if (userRole != "admin" && service.ProviderId != userId)
            {
                return Forbid();
            }

            service.IsActive = !service.IsActive;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Service status updated", isActive = service.IsActive });
        }
    }
}