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

        [HttpPost]
        public void Post(AccountBookKeeping accountBookKeeping)
        {
            Console.WriteLine(accountBookKeeping);
        }
    }
}