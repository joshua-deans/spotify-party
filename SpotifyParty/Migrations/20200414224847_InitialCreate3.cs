using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotifyParty.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Party",
                columns: table => new {
                    PartyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
                    Summary = table.Column<string>(unicode: false, maxLength: 150, nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Party", x => x.PartyId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
                    PartyId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_Party_PartyId",
                        column: x => x.PartyId,
                        principalTable: "Party",
                        principalColumn: "PartyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_PartyId",
                table: "User",
                column: "PartyId");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_PartyId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "PartyId",
                table: "User",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Party_PartyId",
                table: "User",
                column: "PartyId",
                principalTable: "Party",
                principalColumn: "PartyId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Party_PartyId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "PartyId",
                table: "User",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Party_PartyId",
                table: "User",
                column: "PartyId",
                principalTable: "Party",
                principalColumn: "PartyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
