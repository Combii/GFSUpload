using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GFSUploadAPI.Controllers
{
    public class GFSAccountController : ControllerBase
    {
        private readonly ILogger<GFSAccountController> _logger;

        public GFSAccountController(ILogger<GFSAccountController> logger)
        {
            _logger = logger;
        }

        // [HttpPost]
        // public IEnumerable<AccountBookKeeping> Get()
        // {
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new BookKeeping
        //     {
        //         Date = DateTime.Now.AddDays(index),
        //         TemperatureC = rng.Next(-20, 55),
        //         Summary = Summaries[rng.Next(Summaries.Length)]
        //     })
        //     .ToArray();
        // }
    }
}