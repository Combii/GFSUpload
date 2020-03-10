using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        public ActionResult Post(AccountBookKeeping accountBookKeeping)
        {
            return StatusCode(200);
        }

        [HttpGet]
        public ActionResult Get()
        {
            return StatusCode(200);
        }
    }
}