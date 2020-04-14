using System;
using System.Text.Json;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SpotifyParty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        // GET: api/Party
        [HttpGet]
        public IEnumerable<Party> Get()
        {
            var db = new SpotifyPartyDBContext();
            return db.Party.ToList();
        }

        // GET: api/Party/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Party> Get(uint id)
        {
            var db = new SpotifyPartyDBContext();
            var party = db.Party.Single((p) => p.Id == id);
            if (party == null) {
                return NotFound();
            }
            return Ok(party);
        }

        // POST: api/Party
        [HttpPost]
        public void Post([FromBody] JsonElement value)
        {
            var partyName = value.GetProperty("name").GetString();
            var partySummary = value.GetProperty("summary").GetString();
            var db = new SpotifyPartyDBContext();
            db.Party.Add(new Party { Name = partyName, Summary = partySummary });
        }

        // PUT: api/Party/5
        [HttpPut("{id}")]
        public void Put([FromBody] JsonElement value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete([FromBody] JsonElement value)
        {
        }
    }
}
