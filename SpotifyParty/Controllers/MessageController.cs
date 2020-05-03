using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpotifyParty.Models;

namespace SpotifyParty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {

        // GET: api/Message/party/5
        [HttpGet("party/{partyId}", Name = "GetMessagesInParty")]
        public IEnumerable<Message> GetMessagesInParty(int partyId)
        {
            var db = new SpotifyPartyDBContext();
            var result = db.Message
                           .Include(m => m.Sender)
                           .Where(m => m.PartyId == partyId)
                           .OrderBy(m => m.DateTime)
                           .ToList();
            return result;
        }

        // GET: api/Message/5/
        [HttpGet("{messageId}", Name = "GetMessage")]
        public ActionResult<Message> GetMessage(int messageId) {
            var db = new SpotifyPartyDBContext();
            var result = db.Message .SingleOrDefault(m => m.MessageId == messageId) ?? null;
            if (result == null) {
                return NotFound();
            }
            return Ok(result);
        }

        // POST: api/Message
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
    }
}
