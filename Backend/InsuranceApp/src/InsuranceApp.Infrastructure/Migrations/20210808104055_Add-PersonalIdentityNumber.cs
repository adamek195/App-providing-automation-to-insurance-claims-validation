using Microsoft.EntityFrameworkCore.Migrations;

namespace InsuranceApp.Infrastructure.Migrations
{
    public partial class AddPersonalIdentityNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PersonalIdentitynumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PersonalIdentitynumber",
                table: "AspNetUsers");
        }
    }
}
