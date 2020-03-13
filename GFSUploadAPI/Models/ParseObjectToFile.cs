using System.Collections.Generic;
using System.IO;

namespace GFSUploadAPI.Models
{
  public static class ParseObjectToFile
  {
    public static void WriteTxtFile(IEnumerable<AccountBookKeeping> accountBookKeepings)
    {
      using var sw = new StreamWriter("hostDataFileAccountBookKeepings.txt");
      foreach(var accountBookKeeping in accountBookKeepings)
      {
        sw.WriteLine(accountBookKeeping.ToString());
      }
    }

    public static void WriteTxtFile(IEnumerable<BookKeeping> bookKeepings)
    {
      using var sw = new StreamWriter("hostDataFileBookKeepings.txt");
      foreach(var bookKeeping in bookKeepings)
      {
        sw.WriteLine(bookKeeping.ToString());
      }
    }
  }
}
