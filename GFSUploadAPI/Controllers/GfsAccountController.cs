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
    public class GfsAccountController : ControllerBase
    {
        private readonly ILogger<GfsAccountController> _logger;
        private readonly IAccountBookingRepository _accountBookingRepository;
        private readonly DataContext _context;

        public GfsAccountController(ILogger<GfsAccountController> logger, DataContext context,
          IAccountBookingRepository accountBookingRepository)
        {
            _context = context;
            _accountBookingRepository = accountBookingRepository;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<AccountBookKeeping> request)
        {
            var listAddedToDb = await _accountBookingRepository.PostAccountBookKeepingList(request);
            return Ok(listAddedToDb);
        }

        [HttpGet]
        public ActionResult Get()
        {
            return StatusCode(200);
        }
    }
}
