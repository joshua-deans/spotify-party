using System;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace SpotifyParty.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller {
        // GET: /api/User/
        [HttpGet]
        public IEnumerable<User> GetUser() {
            var db = new SpotifyPartyDBContext();
            return db.User.ToList();
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> GetUser(uint id) {
            var db = new SpotifyPartyDBContext();
            var user = db.User.SingleOrDefault((u) => u.UserId == id) ?? null;
            if (user == null) {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/User/email/joshua.deans21@gmail.com
        [HttpGet("email/{email}", Name = "GetUserByEmail")]
        public ActionResult<User> GetUserByEmail(string email) {
            var db = new SpotifyPartyDBContext();
            var user = db.User.SingleOrDefault((p) => p.Email == email) ?? null;
            if (user == null) {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult PostUser([FromBody] JsonElement value) {
            try {
                var userName = value.GetProperty("display_name").GetString();
                var country = value.GetProperty("country").GetString();
                var email = value.GetProperty("email").GetString();
                var db = new SpotifyPartyDBContext();
                db.User.Add(new User { UserName = userName, Country = country, Email = email });
                db.SaveChanges();
                return StatusCode(200);
            }
            catch (Exception e) {
                return StatusCode(500, e.Message);
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id) {
            var db = new SpotifyPartyDBContext();
            var user = new User { UserId = id };
            db.Remove(user);
            db.SaveChanges();
        }
    }
}
