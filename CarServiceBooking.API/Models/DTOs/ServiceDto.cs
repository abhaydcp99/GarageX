using System.ComponentModel.DataAnnotations;

namespace CarServiceBooking.API.Models.DTOs
{
    public class ServiceDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Range(0.01, 10000)]
        public decimal Price { get; set; }
        
        [Required]
        [Range(1, 1440)]
        public int Duration { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;
    }
}