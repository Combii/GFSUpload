using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GFSUploadAPI.Data;
using GFSUploadAPI.Models;
using GFSUploadAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GFSUploadAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class GfsChartController : ControllerBase
    {
        private readonly ILogger<GfsChartController> _logger;
        private readonly IBookingRepository _bookingRepository;
        private readonly DataContext _context;
        private readonly IBookKeepingToTextFileParser _parser;

        public GfsChartController(ILogger<GfsChartController> logger, DataContext context,
          IBookingRepository bookingRepository, IBookKeepingToTextFileParser parser)
        {
            _context = context;
            _bookingRepository = bookingRepository;
            _logger = logger;
            _parser = parser;
        }

        [HttpGet]
        public IActionResult Boss()
        {
            return Ok("b0ss :0)");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<BookKeeping> request)
        {
            var listAddedToDb = await _bookingRepository.PostBookKeepingList(request);
            _parser.WriteToTxtFile(listAddedToDb);
            return Ok(listAddedToDb);
        }
    }
}
