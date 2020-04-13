using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SpotifyParty.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherController> _logger;

        public WeatherController(ILogger<WeatherController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Party> Get() {
            Party[] parties = new Party[1];
            parties[0] = new Party (
                DateTime.Now,
                "Super Party",
                Summaries[0]
            );
            return parties;
        }
    }
}
