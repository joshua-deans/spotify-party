using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class _52Migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Message_PartyId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SenderId",
                table: "Message");

            migrationBuilder.CreateIndex(
                name: "IX_Message_PartyId",
                table: "Message",
                column: "PartyId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Message_PartyId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_SenderId",
                table: "Message");

            migrationBuilder.CreateIndex(
                name: "IX_Message_PartyId",
                table: "Message",
                column: "PartyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId",
                unique: true);
        }
    }
}
