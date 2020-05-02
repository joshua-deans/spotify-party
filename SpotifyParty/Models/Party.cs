using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpotifyParty {
    public class Party
    {
        public Party() {
            this.Users = new List<User>();
        }

        public string Name { get; set; }
        public int PartyId { get; set; }
        public string Summary { get; set; }
        
        public int PartyLeaderUserId { get; set; }
        public User PartyLeader { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
