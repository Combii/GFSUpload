using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public class AccountBookingRepository : IAccountBookingRepository
  {

    private readonly DataContext _context;

    public AccountBookingRepository(DataContext context)
    {
      _context = context;
    }

    public Task<IEnumerable<AccountBookKeeping>> GetAccountBookings()
    {
      throw new System.NotImplementedException();
    }

    public async Task<IEnumerable<AccountBookKeeping>> PostAccountBookKeepingList(IEnumerable<AccountBookKeeping> accountBookKeepingList)
    {
      foreach (var accountBookKeeping in accountBookKeepingList)
      {
        _context.AccountBookKeeping.Add(accountBookKeeping);
      }

      await _context.SaveChangesAsync();

      return accountBookKeepingList;
    }

    public async Task<AccountBookKeeping> PostAccountBookKeeping(AccountBookKeeping accountBookKeeping)
    {
      _context.Add(accountBookKeeping);

      await _context.SaveChangesAsync();

      return accountBookKeeping;
    }
  }
}
