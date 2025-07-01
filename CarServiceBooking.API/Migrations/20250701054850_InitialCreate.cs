using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarServiceBooking.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProviderId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_Users_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<int>(type: "int", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookingTime = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CustomerAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    SpecialInstructions = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedAt", "Email", "Name", "PasswordHash", "Phone", "Role" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2025, 7, 1, 5, 48, 49, 409, DateTimeKind.Utc).AddTicks(3426), "admin@carservice.com", "Admin User", "$2a$11$tHi6LP/yDi4dX7gWG3jxle9f8.oPWt/RjbjDRZlcTo10h/A82T9R.", "+1234567890", "admin" },
                    { 2, null, new DateTime(2025, 7, 1, 5, 48, 49, 665, DateTimeKind.Utc).AddTicks(4129), "provider@carservice.com", "Service Provider", "$2a$11$pHEgULUFLau7ikjV2MZBkOjDJj4amQsom2EEY9/a2.s7G/8LvRBvy", "+1234567891", "provider" },
                    { 3, "123 Main St, City, State", new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2029), "customer@carservice.com", "John Customer", "$2a$11$.aObnIQ063d2iojaDr0rmeglLdkY6cfqX13naBVErCXHxPW8gmV3i", "+1234567892", "customer" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "Duration", "ImageUrl", "IsActive", "Name", "Price", "ProviderId" },
                values: new object[,]
                {
                    { 1, "Maintenance", new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2989), "Complete oil change with high-quality motor oil and filter replacement", 30, "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg", true, "Oil Change Service", 49.99m, 2 },
                    { 2, "Safety", new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2995), "Comprehensive brake system inspection and repair services", 90, "https://images.pexels.com/photos/4489743/pexels-photo-4489743.jpeg", true, "Brake Inspection & Repair", 149.99m, 2 },
                    { 3, "Cleaning", new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2998), "Premium car wash with interior and exterior detailing", 120, "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg", true, "Car Wash & Detailing", 89.99m, 2 },
                    { 4, "Maintenance", new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(3018), "Professional tire rotation and wheel balancing service", 45, "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg", true, "Tire Rotation & Balance", 79.99m, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_CustomerId",
                table: "Bookings",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ProviderId",
                table: "Bookings",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ServiceId",
                table: "Bookings",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_ProviderId",
                table: "Services",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
