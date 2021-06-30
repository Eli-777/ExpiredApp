using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Modal.Migrations
{
    public partial class changeExpirayDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExpiryDay",
                table: "Items",
                newName: "ExpiryDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExpiryDate",
                table: "Items",
                newName: "ExpiryDay");
        }
    }
}
