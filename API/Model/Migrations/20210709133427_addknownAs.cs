using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Model.Migrations
{
    public partial class addknownAs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "KnownAs",
                table: "Settings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KnownAs",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KnownAs",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "KnownAs",
                table: "AspNetUsers");
        }
    }
}
