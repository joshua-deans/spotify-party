using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class _428Migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User",
                column: "CurrentPartyId",
                principalTable: "Party",
                principalColumn: "PartyId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User",
                column: "CurrentPartyId",
                principalTable: "Party",
                principalColumn: "PartyId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
