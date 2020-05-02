using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Threading.Tasks;

namespace SpotifyParty.Hubs {
    public class PartyHub : Hub {
        public async Task AddUser(int userId, int partyId) {
            var db = new SpotifyPartyDBContext();
            var user = db.User.Find(userId);
            var party = db.Party.Find(partyId);
            party.Users.Add(user);
            db.SaveChanges();
            await Groups.AddToGroupAsync(Context.ConnectionId, partyId.ToString());
            
            await Clients.Group(partyId.ToString()).SendAsync("UserAdded", JsonSerializer.Serialize(user));
        }

        public async Task RemoveUser(int userId, int partyId) {
            var db = new SpotifyPartyDBContext();
            var user = db.User.Find(userId);
            var party = db.Party.Find(partyId);
            party.Users.Remove(user);
            db.SaveChanges();
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, partyId.ToString());
            await Clients.Group(partyId.ToString()).SendAsync("UserLeft", JsonSerializer.Serialize(user));
        }

        public async Task SendSongState(int partyId, JsonElement value) {
            await Clients.Group(partyId.ToString()).SendAsync("UpdateSongState", value);
        }
    }
}
