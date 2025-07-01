using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarServiceBooking.API.Migrations
{
    /// <inheritdoc />
    public partial class FixUserTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 39, 40, 393, DateTimeKind.Utc).AddTicks(5743));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 39, 40, 393, DateTimeKind.Utc).AddTicks(5752));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 39, 40, 393, DateTimeKind.Utc).AddTicks(5757));

            migrationBuilder.UpdateData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 1, 6, 39, 40, 393, DateTimeKind.Utc).AddTicks(5795));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 39, 39, 570, DateTimeKind.Utc).AddTicks(8864), "$2a$11$t0s3JFGVX2w/YxZBMp4t1.UEVd08UMein.o2BRvydyVLAMnoXokEm" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 39, 39, 984, DateTimeKind.Utc).AddTicks(7165), "$2a$11$Twaord..w18fue5U.VPtqO8BgA7l4gWi3ctdBPFVxq9IizxfDOH82" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 7, 1, 6, 39, 40, 393, DateTimeKind.Utc).AddTicks(4011), "$2a$11$/LfamEiR39V/oqyQZGbCmeW04vwlJ791PnSKQJzIIRYn8uUiq6Yhq" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
