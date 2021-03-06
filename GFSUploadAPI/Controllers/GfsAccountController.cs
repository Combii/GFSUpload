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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GfsAccountController : ControllerBase
    {
        private readonly ILogger<GfsAccountController> _logger;
        private readonly IAccountBookingRepository _accountBookingRepository;
        private readonly DataContext _context;
        private readonly IBookKeepingToTextFileParser _parser;


        public GfsAccountController(ILogger<GfsAccountController> logger, DataContext context,
          IAccountBookingRepository accountBookingRepository, IBookKeepingToTextFileParser parser)
        {
            _context = context;
            _accountBookingRepository = accountBookingRepository;
            _logger = logger;
            _parser = parser;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<AccountBookKeeping> request)
        {
            var listAddedToDb = await _accountBookingRepository.PostAccountBookKeepingList(request);
            _parser.WriteToTxtFile(listAddedToDb);
            return Ok(listAddedToDb);
        }
    }
}
