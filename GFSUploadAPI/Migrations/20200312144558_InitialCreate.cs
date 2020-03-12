using Microsoft.EntityFrameworkCore.Migrations;

namespace GFSUploadAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountBookKeeping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AccountingDate = table.Column<string>(nullable: true),
                    RegistrationNo = table.Column<string>(nullable: true),
                    Currency = table.Column<string>(nullable: true),
                    IDKT = table.Column<string>(nullable: true),
                    OriginalIDKT = table.Column<string>(nullable: true),
                    CounterAccountIDKT = table.Column<string>(nullable: true),
                    ProjectCode = table.Column<string>(nullable: true),
                    Balance = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountBookKeeping", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountBookKeeping");
        }
    }
}
