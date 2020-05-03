using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class _52Migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Message");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Message",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Message");

            migrationBuilder.AddColumn<DateTime>(
                name: "Time",
                table: "Message",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
