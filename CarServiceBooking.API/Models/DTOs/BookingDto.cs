using System.ComponentModel.DataAnnotations;

namespace CarServiceBooking.API.Models.DTOs
{
    public class BookingDto
    {
        [Required]
        public int ServiceId { get; set; }
        
        [Required]
        public DateTime BookingDate { get; set; }
        
        [Required]
        [StringLength(10)]
        public string BookingTime { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string CustomerAddress { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? SpecialInstructions { get; set; }
    }
}