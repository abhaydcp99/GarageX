using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarServiceBooking.API.Models
{
    public class Booking
    {
        public int Id { get; set; }
        
        [Required]
        public int ServiceId { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
        
        [Required]
        public int ProviderId { get; set; }
        
        [Required]
        public DateTime BookingDate { get; set; }
        
        [Required]
        [StringLength(10)]
        public string BookingTime { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "pending"; // pending, confirmed, in-progress, completed, cancelled
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }
        
        [Required]
        [StringLength(50)]
        public string PaymentStatus { get; set; } = "pending"; // pending, paid, refunded
        
        [Required]
        [StringLength(500)]
        public string CustomerAddress { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? SpecialInstructions { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("ServiceId")]
        public virtual Service Service { get; set; } = null!;
        
        [ForeignKey("CustomerId")]
        public virtual User Customer { get; set; } = null!;
        
        [ForeignKey("ProviderId")]
        public virtual User Provider { get; set; } = null!;
    }
}