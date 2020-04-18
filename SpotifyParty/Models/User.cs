using System;
using System.Collections.Generic;

namespace SpotifyParty
{
    public partial class User
    {
        public string UserName { get; set; }
        public int UserId { get; set; }
        public int? PartyId { get; set; }
        public Party? CurrentParty { get; set; }
    }
}
