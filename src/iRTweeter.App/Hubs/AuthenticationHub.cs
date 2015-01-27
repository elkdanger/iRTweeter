using Microsoft.AspNet.SignalR;
using TweetSharp;

namespace iRTweeter.App.Hubs
{
    public class AuthenticationHub : Hub
    {
        public void SignOut()
        {
            Clients.All.SignOut();
        }

        public void SignIn(TwitterUser user)
        {
            Clients.All.SignIn(user);
        }
    }
}
