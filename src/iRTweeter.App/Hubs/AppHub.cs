using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iRTweeter.App.Authentication;
using Microsoft.AspNet.SignalR;
using TweetSharp;

namespace iRTweeter.App.Hubs
{
    public class AppHub : Hub
    {
        /// <summary>
        /// Gets the authenticated user.
        /// </summary>
        public TwitterUser GetAuthenticatedUser()
        {
            return AuthenticationHelper.AuthenticatedTwitterUser;
        }

        public void SignOut()
        {
            AuthenticationHelper.SignOut();

            Clients.All.signOut();
        }
    }
}
