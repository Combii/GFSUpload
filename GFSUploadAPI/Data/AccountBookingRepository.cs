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

    public async Task<IEnumerable<AccountBookKeeping>> GetAccountBookings()
    {
      return _context.AccountBookKeeping.AsQueryable().ToList();
    }

    public async Task<IEnumerable<AccountBookKeeping>> PostAccountBookKeepingList(IEnumerable<AccountBookKeeping> accountBookKeepingList)
    {
      var postAccountBookKeepingList = accountBookKeepingList.ToList();
      foreach (var accountBookKeeping in postAccountBookKeepingList)
      {
        _context.AccountBookKeeping.Add(accountBookKeeping);
      }

      await _context.SaveChangesAsync();

      return postAccountBookKeepingList;
    }

    public async Task<AccountBookKeeping> PostAccountBookKeeping(AccountBookKeeping accountBookKeeping)
    {
      _context.Add(accountBookKeeping);

      await _context.SaveChangesAsync();

      return accountBookKeeping;
    }
  }
}
