using System.Collections.Generic;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public interface IAccountBookingRepository
  {
    Task<IEnumerable<AccountBookKeeping>> GetAccountBookings();
    Task<IEnumerable<AccountBookKeeping>> PostAccountBookKeepingList(IEnumerable<AccountBookKeeping> accountBookKeepingList);
    Task<AccountBookKeeping> PostAccountBookKeeping(AccountBookKeeping accountBookKeeping);

  }
}
