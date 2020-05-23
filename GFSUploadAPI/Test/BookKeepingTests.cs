using System.Linq;
using GFSUploadAPI.Data;
using GFSUploadAPI.Models;
using Xunit;

namespace GFSUploadAPI.Test
{
    public class BookKeepingTests
    {
        private readonly IBookingRepository _bookingRepository;
        public BookKeepingTests(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [Fact]
        public async void FirstTest()
        {
            var res = await _bookingRepository.GetBookings();
            var count = res.ToList<BookKeeping>().Count;
            Assert.True(count > 0);
        }

    }
}