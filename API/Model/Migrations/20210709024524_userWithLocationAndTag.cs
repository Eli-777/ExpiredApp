using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Model.Migrations
{
    public partial class userWithLocationAndTag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Tags",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Locations",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_AppUserId",
                table: "Tags",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_AppUserId",
                table: "Locations",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_AspNetUsers_AppUserId",
                table: "Locations",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_AspNetUsers_AppUserId",
                table: "Tags",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_AspNetUsers_AppUserId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Tags_AspNetUsers_AppUserId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_AppUserId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Locations_AppUserId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Locations");
        }
    }
}
