using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GFSUploadAPI.Data;
using GFSUploadAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GFSUploadAPI.Controllers
{
    [Route("api/[controller]")]
    public class GfsChartController : ControllerBase
    {
        private readonly ILogger<GfsAccountController> _logger;
        private readonly IBookingRepository _bookingRepository;
        private readonly DataContext _context;

        public GfsChartController(ILogger<GfsAccountController> logger, DataContext context,
          IBookingRepository bookingRepository)
        {
            _context = context;
            _bookingRepository = bookingRepository;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<BookKeeping> request)
        {
            var listAddedToDb = await _bookingRepository.PostBookKeepingList(request);
            ParseObjectToFile.WriteTxtFile(listAddedToDb);
            return Ok(listAddedToDb);
        }

        [HttpGet]
        public ActionResult Get()
        {
            return StatusCode(200);
        }
    }
}
