using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repeet.Migrations
{
    /// <inheritdoc />
    public partial class OwnerToSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "Sets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Sets_OwnerId",
                table: "Sets",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sets_AspNetUsers_OwnerId",
                table: "Sets",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sets_AspNetUsers_OwnerId",
                table: "Sets");

            migrationBuilder.DropIndex(
                name: "IX_Sets_OwnerId",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Sets");
        }
    }
}
