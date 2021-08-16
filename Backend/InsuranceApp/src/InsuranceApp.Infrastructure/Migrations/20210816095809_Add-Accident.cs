using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InsuranceApp.Infrastructure.Migrations
{
    public partial class AddAccident : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accidents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyId = table.Column<int>(type: "int", nullable: false),
                    AccidentDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AccidentDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuiltyPartyPolicyNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuiltyPartyRegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccidentImage = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accidents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accidents_Policies_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "Policies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accidents_PolicyId",
                table: "Accidents",
                column: "PolicyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accidents");
        }
    }
}
