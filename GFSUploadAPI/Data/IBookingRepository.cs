using System.Collections.Generic;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public interface IBookingRepository
  {
    Task<IEnumerable<BookKeeping>> GetBookings();
    Task<IEnumerable<BookKeeping>> PostBookKeepingList(IEnumerable<BookKeeping> bookKeepingList);
    Task<BookKeeping> PostBookKeeping(BookKeeping bookKeeping);
  }
}
