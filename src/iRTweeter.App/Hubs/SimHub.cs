using System;
using System.Threading.Tasks;
using iRTweeter.Contracts;
using iRTweeter.Types;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace iRTweeter.App.Hubs
{
    public interface ISimHub
    {
        void SimConnected(ISimConnection connection);
        void SimDisconnected();
    }

    public class SimHub : Hub<ISimHub>
    {
        public static Lazy<IHubConnectionContext<ISimHub>> Context =
            new Lazy<IHubConnectionContext<ISimHub>>(() => GlobalHost.ConnectionManager.GetHubContext<SimHub, ISimHub>().Clients);

        public void SimConnected(ISimConnection connection)
        {
            Clients.All.SimConnected(connection);
        }

        public void SimDisconnected()
        {
            Clients.All.SimDisconnected();
        }

        public ISimConnection GetSimConnection()
        {
            return DependencyResolver.Current.GetService<ISimProcessor>().CurrentConnection;
        }
    }
}
