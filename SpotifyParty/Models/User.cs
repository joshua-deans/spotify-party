using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpotifyParty.Models {
    public class User {
        private static uint currId = 1;
        User(string name) {
            Id = currId++;
        }

        public uint Id { get; }

        public string Name { get; set; }
    }
}
