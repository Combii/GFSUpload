using System.Collections.Generic;
using System.IO;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Services
{
    public class AccountBookKeepingToFileParser : IAccountBookKeepingToFileParser
    {
        public void WriteToTxtFile(IEnumerable<AccountBookKeeping> accountBookKeepings)
        {
            using var sw = new StreamWriter("hostDataFileAccountBookKeepings.txt");
            foreach (var accountBookKeeping in accountBookKeepings)
            {
                                var row = string.Format("{0,-47}{1,5}{2,14}{3,22}{4,8}{5,24}{6,13}{7,7}",
                accountBookKeeping.CreatedDate + accountBookKeeping.RegistrationNo + accountBookKeeping.IDKT + accountBookKeeping.OriginalIDKT,
                accountBookKeeping.CounterAccountIDKT + accountBookKeeping.ProjectCode, accountBookKeeping.Currency, accountBookKeeping.Balance 
                );
            }
        }

        public void WriteToTxtFile(IEnumerable<BookKeeping> bookKeepings)
        {
            using var sw = new StreamWriter("hostDataFileBookKeepings.txt");
            foreach (var bookKeeping in bookKeepings)
            {
                var row = string.Format("{0,-47}{1,5}{2,14}{3,22}{4,8}{5,24}{6,13}{7,7}",
                bookKeeping.CreatedDate + bookKeeping.RegNr + bookKeeping.regnskabstype + bookKeeping.dkkbass + bookKeeping.skema_id,
                bookKeeping.skemarakke + bookKeeping.valutakod, bookKeeping.ldkd, bookKeeping.kngr, 
                bookKeeping.kngr_typ + bookKeeping.pdst + bookKeeping.sum_rgopid + bookKeeping.opdater_lev + bookKeeping.leveran_kor + bookKeeping.leveran_type, 
                bookKeeping.saldo + "LATVIA", "JANUARY 2020", "UPLOAD");

                sw.WriteLine(row);
            }
        }
    }
}