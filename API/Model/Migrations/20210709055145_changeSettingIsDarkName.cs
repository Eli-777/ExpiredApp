using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Model.Migrations
{
    public partial class changeSettingIsDarkName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Setting_AspNetUsers_id",
                table: "Setting");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Setting",
                table: "Setting");

            migrationBuilder.RenameTable(
                name: "Setting",
                newName: "Settings");

            migrationBuilder.RenameColumn(
                name: "isDarkMode",
                table: "Settings",
                newName: "IsDarkMode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Settings",
                table: "Settings",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_AspNetUsers_id",
                table: "Settings",
                column: "id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_AspNetUsers_id",
                table: "Settings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Settings",
                table: "Settings");

            migrationBuilder.RenameTable(
                name: "Settings",
                newName: "Setting");

            migrationBuilder.RenameColumn(
                name: "IsDarkMode",
                table: "Setting",
                newName: "isDarkMode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Setting",
                table: "Setting",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Setting_AspNetUsers_id",
                table: "Setting",
                column: "id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
