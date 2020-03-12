using System.Collections.Generic;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public class AccountBookingRepository : IAccountBookingRepository
  {



    public Task<IEnumerable<AccountBookKeeping>> GetAccountBookings()
    {
      throw new System.NotImplementedException();
    }
  }
}
