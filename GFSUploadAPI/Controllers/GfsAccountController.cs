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
    public class GfsAccountController : ControllerBase
    {
        private readonly ILogger<GfsAccountController> _logger;

        public GfsAccountController(ILogger<GfsAccountController> logger)
        {
            _logger = logger;
        }

    [HttpPost]
    public IActionResult Post([FromBody] IEnumerable<AccountBookKeeping> request)
    {
        return Ok(request);
    }

    [HttpGet]
    public ActionResult Get()
    {
        return StatusCode(200);
    }
    }
}
