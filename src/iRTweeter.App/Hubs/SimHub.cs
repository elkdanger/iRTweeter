using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace iRTweeter.App.Hubs
{
    public class SimHub : Hub
    {
        public void SimConnected()
        {
            Clients.All.SimConnected();
        }
    }
}
