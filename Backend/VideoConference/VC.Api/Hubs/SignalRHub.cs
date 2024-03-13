using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using VC.Application;

namespace VC.Api
{
    public class SignalRHub : Hub
    {
        //split into bl
        public async Task NewUser(string username)
        {
            var userInfo = new UserInfo() { UserName = username, ConnectionId = Context.ConnectionId };
            await Clients.Others.SendAsync("NewUserArrived", JsonSerializer.Serialize(userInfo));
        }

        public async Task HelloUser(string userName, string user)
        {
            var userInfo = new UserInfo() { UserName = userName, ConnectionId = Context.ConnectionId };
            await Clients.Client(user).SendAsync("UserSaidHello", JsonSerializer.Serialize(userInfo));
        }

        public async Task SendSignal(string signal, string user)
        {
            await Clients.Client(user).SendAsync("SendSignal", Context.ConnectionId, signal);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnect", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
