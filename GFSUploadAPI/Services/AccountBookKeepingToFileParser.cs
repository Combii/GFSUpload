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
                        accountBookKeeping.,"11EUR","LV","00","FEBLOVAPA01BJKPL","1643575,32LATVIA", "JANUARY 2020", "UPLOAD");
                sw.WriteLine(row;
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