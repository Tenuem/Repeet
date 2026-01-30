using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repeet.Migrations
{
    /// <inheritdoc />
    public partial class FlashcardOwnership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "Flashcards",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flashcards_OwnerId",
                table: "Flashcards",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flashcards_AspNetUsers_OwnerId",
                table: "Flashcards",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flashcards_AspNetUsers_OwnerId",
                table: "Flashcards");

            migrationBuilder.DropIndex(
                name: "IX_Flashcards_OwnerId",
                table: "Flashcards");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Flashcards");
        }
    }
}
