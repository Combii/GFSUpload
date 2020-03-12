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

            migrationBuilder.CreateTable(
                name: "BookKeeping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Dato = table.Column<string>(nullable: true),
                    RegNr = table.Column<string>(nullable: true),
                    regnskabstype = table.Column<string>(nullable: true),
                    dkkbass = table.Column<string>(nullable: true),
                    skema_id = table.Column<string>(nullable: true),
                    skemarakke = table.Column<string>(nullable: true),
                    valutakod = table.Column<string>(nullable: true),
                    ldkd = table.Column<string>(nullable: true),
                    kngr = table.Column<string>(nullable: true),
                    kngr_typ = table.Column<string>(nullable: true),
                    pdst = table.Column<string>(nullable: true),
                    sum_rgopid = table.Column<string>(nullable: true),
                    opdater_lev = table.Column<string>(nullable: true),
                    leveran_kor = table.Column<string>(nullable: true),
                    leveran_type = table.Column<string>(nullable: true),
                    saldo = table.Column<string>(nullable: true),
                    Tekst = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookKeeping", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountBookKeeping");

            migrationBuilder.DropTable(
                name: "BookKeeping");
        }
    }
}
