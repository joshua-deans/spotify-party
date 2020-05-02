using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class _428Migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Party_User_PartyLeaderUserId",
                table: "Party");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Party_PartyLeaderUserId",
                table: "Party");

            migrationBuilder.CreateIndex(
                name: "IX_Party_PartyLeaderUserId",
                table: "Party",
                column: "PartyLeaderUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Party_User_PartyLeaderUserId",
                table: "Party",
                column: "PartyLeaderUserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_Party_User_PartyLeaderUserId",
                table: "Party");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Party_PartyLeaderUserId",
                table: "Party");

            migrationBuilder.CreateIndex(
                name: "IX_Party_PartyLeaderUserId",
                table: "Party",
                column: "PartyLeaderUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Party_User_PartyLeaderUserId",
                table: "Party",
                column: "PartyLeaderUserId",
                principalTable: "User",
                principalColumn: "UserId");

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
