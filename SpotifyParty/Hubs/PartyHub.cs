using Microsoft.AspNetCore.SignalR;
using SpotifyParty.Models;
using System;
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

        public async Task SendMessage(int partyId, int userId, string content) {
            if (content.Length == 0) {
                return;
            }
            var db = new SpotifyPartyDBContext();
            var user = db.User.Find(userId);
            var party = db.Party.Find(partyId);
            var message = new Message() { Content = content, Party = party, Sender = user, DateTime = DateTime.Now };
            db.Message.Add(message);
            db.SaveChanges();
            var sender = JsonSerializer.Serialize(new {
                country = message.Sender.Country,
                currentPartyId = message.Sender.CurrentPartyId,
                email = message.Sender.Email,
                userId = message.Sender.UserId,
                userName = message.Sender.UserName
            });

            await Clients.Group(partyId.ToString()).SendAsync("ReceiveMessage", JsonSerializer.Serialize(new { 
                messageId = message.MessageId,
                content = message.Content,
                sender, 
                dateTime = message.DateTime
            }));
        }
    }
}
