using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SpotifyParty.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        Party[] parties = new Party[]
        {
            new Party (DateTime.Now, "Tomato Soup", "Groceries"),
            new Party (DateTime.Now, "Yo-yo", "Toys"),
            new Party (DateTime.Now, "Hammer", "Hardware")
        };

        // GET: api/Party
        [HttpGet]
        public IEnumerable<Party> Get()
        {
            return parties;
        }

        // GET: api/Party/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Party> Get(uint id)
        {
            var party = parties.FirstOrDefault((p) => p.Id == id);
            if (party == null) {
                return NotFound();
            }
            return Ok(party);
        }

        //// POST: api/Party
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Party/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
