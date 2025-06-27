using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarServiceBooking.API.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = "customer"; // admin, provider, customer
        
        public string? Phone { get; set; }
        
        public string? Address { get; set; }
        
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<Service> Services { get; set; } = new List<Service>();
        public virtual ICollection<Booking> CustomerBookings { get; set; } = new List<Booking>();
        public virtual ICollection<Booking> ProviderBookings { get; set; } = new List<Booking>();
    }
}