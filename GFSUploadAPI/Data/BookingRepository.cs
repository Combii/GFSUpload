using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GFSUploadAPI.Models;

namespace GFSUploadAPI.Data
{
  public class BookingRepository : IBookingRepository
  {

    private readonly DataContext _context;

    public BookingRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<IEnumerable<BookKeeping>> GetBookings()
    {
      return _context.BookKeeping.AsQueryable().ToList();
    }

    public async Task<IEnumerable<BookKeeping>> PostBookKeepingList(IEnumerable<BookKeeping> bookKeepingList)
    {
      var postBookKeepingList = bookKeepingList.ToList();
      foreach (var bookKeeping in postBookKeepingList)
      {
        _context.BookKeeping.Add(bookKeeping);
      }

      await _context.SaveChangesAsync();

      return postBookKeepingList;
    }

    public async Task<BookKeeping> PostBookKeeping(BookKeeping bookKeeping)
    {
      _context.Add(bookKeeping);

      await _context.SaveChangesAsync();

      return bookKeeping;
    }
  }
}
