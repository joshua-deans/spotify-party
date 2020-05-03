using System;

namespace SpotifyParty.Models {
    public class Message {

        public string Content { get; set; }
        public int MessageId { get; set; }

        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int PartyId { get; set; }
        public Party Party { get; set; }
        public DateTime DateTime { get; set; }
    }
}
