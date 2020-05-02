using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class _423Migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Country = table.Column<string>(nullable: true),
                    CurrentPartyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.UniqueConstraint("AK_User_Email", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "Party",
                columns: table => new
                {
                    PartyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    Summary = table.Column<string>(unicode: false, maxLength: 150, nullable: true),
                    PartyLeaderUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Party", x => x.PartyId);
                    table.ForeignKey(
                        name: "FK_Party_User_PartyLeaderUserId",
                        column: x => x.PartyLeaderUserId,
                        principalTable: "User",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Party_PartyLeaderUserId",
                table: "Party",
                column: "PartyLeaderUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_CurrentPartyId",
                table: "User",
                column: "CurrentPartyId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Party_CurrentPartyId",
                table: "User",
                column: "CurrentPartyId",
                principalTable: "Party",
                principalColumn: "PartyId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Party_User_PartyLeaderUserId",
                table: "Party");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Party");
        }
    }
}
