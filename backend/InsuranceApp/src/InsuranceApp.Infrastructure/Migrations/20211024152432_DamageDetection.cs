using Microsoft.EntityFrameworkCore.Migrations;

namespace InsuranceApp.Infrastructure.Migrations
{
    public partial class DamageDetection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "DamageDetected",
                table: "UserAccidents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "DamageDetected",
                table: "GuiltyPartyAccidents",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DamageDetected",
                table: "UserAccidents");

            migrationBuilder.DropColumn(
                name: "DamageDetected",
                table: "GuiltyPartyAccidents");
        }
    }
}
