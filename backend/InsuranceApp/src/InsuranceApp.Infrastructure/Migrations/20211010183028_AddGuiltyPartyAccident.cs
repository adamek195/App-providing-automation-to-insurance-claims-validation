using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InsuranceApp.Infrastructure.Migrations
{
    public partial class AddGuiltyPartyAccident : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GuiltyPartyAccidents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccidentDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AccidentDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuiltyPartyPolicyNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuiltyPartyRegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccidentImage = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuiltyPartyAccidents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuiltyPartyAccidents_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GuiltyPartyAccidents_UserId",
                table: "GuiltyPartyAccidents",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GuiltyPartyAccidents");
        }
    }
}
