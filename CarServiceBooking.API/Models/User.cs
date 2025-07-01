using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;   // ✅ required
using System.Text.Json.Serialization;               // ✅ keep this for PasswordHash

namespace CarServiceBooking.API.Models
{
    [Table("Users")]  // ✅ fixes table mismatch
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "customer";

        public string? Phone { get; set; }

        public string? Address { get; set; }

        [JsonIgnore]  // ✅ hides password from being returned in JSON
        public string PasswordHash { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Service> Services { get; set; } = new List<Service>();
        public virtual ICollection<Booking> CustomerBookings { get; set; } = new List<Booking>();
        public virtual ICollection<Booking> ProviderBookings { get; set; } = new List<Booking>();
    }
}
