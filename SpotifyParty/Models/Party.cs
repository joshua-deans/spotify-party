using System;

namespace SpotifyParty {
    public class Party {
        private static uint currId = 1;
        public Party(DateTime startTime, string name, string summary) {
            Id = currId++;
            StartTime = startTime;
            Name = name;
            Summary = summary;
        }

        public uint Id { get; }
        public DateTime StartTime { get; }

        public string Name { get; set; }

        public string Summary { get; set; }
    }
}
