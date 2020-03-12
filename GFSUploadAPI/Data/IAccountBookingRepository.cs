using System.Collections.Generic;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public interface IAccountBookingRepository
  {
    Task<IEnumerable<AccountBookKeeping>> GetAccountBookings();
  }
}
