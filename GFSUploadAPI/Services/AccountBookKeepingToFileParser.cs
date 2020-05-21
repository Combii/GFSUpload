using System.Collections.Generic;
using System.IO;
using System.Text;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Services
{
    public class BookKeepingToTextFileParser : IBookKeepingToTextFileParser
    {
        public void WriteToTxtFile(IEnumerable<AccountBookKeeping> accountBookKeepings)
        {
            using var sw = new StreamWriter("hostDataFileAccountBookKeepings.txt");
            foreach (var accountBookKeeping in accountBookKeepings)
            {
                var row = string.Format("{0,-47}{1,5}{2,14}{3,22}",
                accountBookKeeping.CreatedDate + accountBookKeeping.RegistrationNo + accountBookKeeping.IDKT + accountBookKeeping.OriginalIDKT,
                accountBookKeeping.CounterAccountIDKT + accountBookKeeping.ProjectCode, accountBookKeeping.Currency, accountBookKeeping.Balance
                );

                sw.WriteLine(row);
                //sw.WriteLine(accountBookKeeping.ToString());
            }
        }

        public void WriteToTxtFile(IEnumerable<BookKeeping> bookKeepings)
        {
            using (var sw = new StreamWriter("hostDataFileBookKeepings.txt"))
            {
                StringBuilder row = new StringBuilder();

                row.Append("0----5");

                var counter = 10;
                var firstRun = true;
                while (counter < 150)
                {
                    if (firstRun)
                    {
                        row.Append("----" + counter);
                        firstRun = false;
                    }
                    else
                    {
                        row.Append("---" + counter);
                    }
                    counter = counter + 5;
                }
                sw.WriteLine(row);
                row.Clear();

                foreach (var bookKeeping in bookKeepings)
                {
                    // row.Append(string.Format("{0,-60}{1,-17}{2,-17}{3,-17}{4,-17}{5,-17}",
                    // bookKeeping.CreatedDate + bookKeeping.RegNr + bookKeeping.regnskabstype + bookKeeping.dkkbass + bookKeeping.skema_id,
                    // bookKeeping.skemarakke + bookKeeping.valutakod, 
                    // bookKeeping.ldkd, 
                    // bookKeeping.kngr,
                    // bookKeeping.kngr_typ + bookKeeping.pdst + bookKeeping.sum_rgopid + bookKeeping.opdater_lev + bookKeeping.leveran_kor + bookKeeping.leveran_type,
                    // bookKeeping.saldo + "LATVIA JANUARY 2020 UPLOAD"));

                    row.Append(string.Format("{0,-50}{1,20}{2,-10}{3,-10}{4,-10}{5,30}",
                    bookKeeping.CreatedDate + bookKeeping.RegNr + bookKeeping.regnskabstype + bookKeeping.dkkbass + bookKeeping.skema_id,
                    bookKeeping.skemarakke + bookKeeping.valutakod, 
                    bookKeeping.ldkd, 
                    bookKeeping.kngr,
                    bookKeeping.kngr_typ + bookKeeping.pdst + bookKeeping.sum_rgopid + bookKeeping.opdater_lev + bookKeeping.leveran_kor + bookKeeping.leveran_type,
                    bookKeeping.saldo + " LATVIA JANUARY 2020 UPLOAD"));
                    row.Append("\n");
                }
                sw.WriteLine(row);

            };
        }
    }
}