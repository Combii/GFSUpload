using System.Collections.Generic;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Services
{
    public interface IAccountBookKeepingToFileParser
    {
         void WriteToTxtFile(IEnumerable<AccountBookKeeping> accountBookKeepings);
         void WriteToTxtFile(IEnumerable<BookKeeping> bookKeepings);
    }
}