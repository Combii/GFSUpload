using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GFSUploadAPI.Controllers
{
    [Route("api/[controller]")]
    public class GFSAccountController : ControllerBase
    {
        private readonly ILogger<GFSAccountController> _logger;

        public GFSAccountController(ILogger<GFSAccountController> logger)
        {
            _logger = logger;
        }

    [HttpPost]
    public IActionResult Post([FromBody] IEnumerable<AccountBookKeeping> request)
    {
        System.Console.WriteLine(request);
        return Ok(request);
    }

    [HttpGet]
    public ActionResult Get()
    {
        return StatusCode(200);
    }
    }
}
