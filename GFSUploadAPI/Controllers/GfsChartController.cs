using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly ILogger<GfsChartController> _logger;

        public GfsChartController(ILogger<GfsChartController> logger)
        {
            _logger = logger;
        }

    [HttpPost]
    public IActionResult Post([FromBody] IEnumerable<BookKeeping> request)
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
