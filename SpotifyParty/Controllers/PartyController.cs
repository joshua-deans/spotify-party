using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace SpotifyParty.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        // GET: api/Party
        [HttpGet]
        public IEnumerable<Party> GetParties()
        {
            var db = new SpotifyPartyDBContext();
            var parties = db.Party.AsNoTracking()
                .Include(party => party.Users);
            return parties;
        }

        // GET: api/Party/5
        [HttpGet("{id}", Name = "GetParty")]
        public ActionResult<Party> GetParty(uint id)
        {
            var db = new SpotifyPartyDBContext();
            var party = db.Party
                .Include(party => party.Users)
                .Include(party => party.PartyLeader)
                .Single((p) => p.PartyId == id);
            Debug.WriteLine(party.Users.ToString());
            if (party == null) {
                return NotFound();
            }
            return Ok(party);
        }

        // POST: api/Party
        [HttpPost]
        public IActionResult PostParty([FromBody] JsonElement value)
        {
            try {
                var partyName = value.GetProperty("name").GetString();
                var partySummary = value.GetProperty("summary").GetString();
                var userId = value.GetProperty("userId").GetInt32();
                var db = new SpotifyPartyDBContext();
                var user = db.User.Find(userId);
                db.Party.Add(new Party { Name = partyName, Summary = partySummary, PartyLeader = user });
                db.SaveChanges();
                return StatusCode(200);
            }
            catch (Exception e) {
                return StatusCode(500, e.ToString());
            }
        }

        // PUT: api/Party/5
        [HttpPut("{id}")]
        public void PutParty(uint id, [FromBody] JsonElement value) {
            var db = new SpotifyPartyDBContext();
        }

        // DELETE: api/Party/5
        [HttpDelete("{id}")]
        public IActionResult DeleteParty(int id) {
            try {
                var db = new SpotifyPartyDBContext();
                var party = new Party { PartyId = id };
                db.Remove(party);
                db.SaveChanges();
                return StatusCode(200);
            }
            catch (Exception e) {
                return StatusCode(500, e.Message);
            }
        }
    }
}
