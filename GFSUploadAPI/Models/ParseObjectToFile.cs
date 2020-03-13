using System.Collections.Generic;
using System.IO;

namespace GFSUploadAPI.Models
{
  public static class ParseObjectToFile
  {
    public static void WriteTxtFile(IEnumerable<AccountBookKeeping> accountBookKeepings)
    {
      using var sw = new StreamWriter("hostDataFile.txt");
      foreach(var accountBookKeeping in accountBookKeepings)
      {
        sw.WriteLine(accountBookKeeping.ToString());
      }
    }
  }
}
