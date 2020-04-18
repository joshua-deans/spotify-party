using System;
using System.Collections.Generic;

namespace SpotifyParty
{
    public class Party
    {
        public string Name { get; set; }
        public int PartyId { get; set; }
        public string Summary { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
