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
                sw.WriteLine(accountBookKeeping.ToString());
            }
        }

        public void WriteToTxtFile(IEnumerable<BookKeeping> bookKeepings)
        {
            using var sw = new StreamWriter("hostDataFileBookKeepings.txt");
            foreach (var bookKeeping in bookKeepings)
            {
                sw.WriteLine(bookKeeping.ToString());
            }
        }
    }
}