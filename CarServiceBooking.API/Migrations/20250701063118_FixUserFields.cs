using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarServiceBooking.API.Migrations
{
    /// <inheritdoc />
    public partial class FixUserFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 31, 17, 938, DateTimeKind.Utc).AddTicks(7660));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 31, 17, 938, DateTimeKind.Utc).AddTicks(7666));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 31, 17, 938, DateTimeKind.Utc).AddTicks(7671));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 31, 17, 938, DateTimeKind.Utc).AddTicks(7704));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 31, 17, 408, DateTimeKind.Utc).AddTicks(226), "$2a$11$5r/aCTw1Nk.38VW49Ze1vuE6IhzvblYXEQoSbkbuv/2dcf029pIaO" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 31, 17, 673, DateTimeKind.Utc).AddTicks(8864), "$2a$11$Hf/Np.M3C7capwq2ygcNnu/Pkm1YFKoWsQ8iN/XTIxJojYkUYu3uS" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 31, 17, 938, DateTimeKind.Utc).AddTicks(6188), "$2a$11$fdQrM1f0aMgPdKMwtS7Da.Qo/rPBelD8QpzXEuDtSS0ciH4ZNzOZ2" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2989));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2995));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2998));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(3018));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 5, 48, 49, 409, DateTimeKind.Utc).AddTicks(3426), "$2a$11$tHi6LP/yDi4dX7gWG3jxle9f8.oPWt/RjbjDRZlcTo10h/A82T9R." });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 5, 48, 49, 665, DateTimeKind.Utc).AddTicks(4129), "$2a$11$pHEgULUFLau7ikjV2MZBkOjDJj4amQsom2EEY9/a2.s7G/8LvRBvy" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 5, 48, 49, 929, DateTimeKind.Utc).AddTicks(2029), "$2a$11$.aObnIQ063d2iojaDr0rmeglLdkY6cfqX13naBVErCXHxPW8gmV3i" });
        }
    }
}
