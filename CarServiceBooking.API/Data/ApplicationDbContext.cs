using Microsoft.EntityFrameworkCore;
using CarServiceBooking.API.Models;

namespace CarServiceBooking.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configure Service entity
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.Price).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ImageUrl).HasMaxLength(1000);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(e => e.Provider)
                      .WithMany(u => u.Services)
                      .HasForeignKey(e => e.ProviderId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Booking entity
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.BookingDate).IsRequired();
                entity.Property(e => e.BookingTime).IsRequired().HasMaxLength(10);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PaymentStatus).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CustomerAddress).IsRequired().HasMaxLength(500);
                entity.Property(e => e.SpecialInstructions).HasMaxLength(1000);
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(10,2)");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(e => e.Service)
                      .WithMany(s => s.Bookings)
                      .HasForeignKey(e => e.ServiceId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Customer)
                      .WithMany(u => u.CustomerBookings)
                      .HasForeignKey(e => e.CustomerId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Provider)
                      .WithMany(u => u.ProviderBookings)
                      .HasForeignKey(e => e.ProviderId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed initial data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@carservice.com",
                    Name = "Admin User",
                    Role = "admin",
                    Phone = "+1234567890",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    Email = "provider@carservice.com",
                    Name = "Service Provider",
                    Role = "provider",
                    Phone = "+1234567891",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("provider123"),
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 3,
                    Email = "customer@carservice.com",
                    Name = "John Customer",
                    Role = "customer",
                    Phone = "+1234567892",
                    Address = "123 Main St, City, State",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("customer123"),
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Seed Services
            modelBuilder.Entity<Service>().HasData(
                new Service
                {
                    Id = 1,
                    Name = "Oil Change Service",
                    Description = "Complete oil change with high-quality motor oil and filter replacement",
                    Price = 49.99m,
                    Duration = 30,
                    Category = "Maintenance",
                    ProviderId = 2,
                    ImageUrl = "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 2,
                    Name = "Brake Inspection & Repair",
                    Description = "Comprehensive brake system inspection and repair services",
                    Price = 149.99m,
                    Duration = 90,
                    Category = "Safety",
                    ProviderId = 2,
                    ImageUrl = "https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 3,
                    Name = "Car Wash & Detailing",
                    Description = "Premium car wash with interior and exterior detailing",
                    Price = 89.99m,
                    Duration = 120,
                    Category = "Cleaning",
                    ProviderId = 2,
                    ImageUrl = "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 4,
                    Name = "Tire Rotation & Balance",
                    Description = "Professional tire rotation and wheel balancing service",
                    Price = 79.99m,
                    Duration = 45,
                    Category = "Maintenance",
                    ProviderId = 2,
                    ImageUrl = "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
