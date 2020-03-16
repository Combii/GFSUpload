using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GFSUploadAPI.Data;
using GFSUploadAPI.Models;
using GFSUploadAPI.Services;
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
        private readonly IAccountBookKeepingToFileParser _parser;

        public GfsChartController(ILogger<GfsAccountController> logger, DataContext context,
          IBookingRepository bookingRepository, IAccountBookKeepingToFileParser parser)
        {
            _context = context;
            _bookingRepository = bookingRepository;
            _logger = logger;
            _parser = parser;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<BookKeeping> request)
        {
            var listAddedToDb = await _bookingRepository.PostBookKeepingList(request);
            _parser.WriteToTxtFile(listAddedToDb);
            return Ok(listAddedToDb);
        }

        [HttpGet]
        public ActionResult Get()
        {
            return StatusCode(200);
        }
    }
}
