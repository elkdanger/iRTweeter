using System;
using iRTweeter.Sim.EventModel;

namespace iRTweeter.Sim
{
    public interface ISimProcessor
    {
        event EventHandler<SimConnectedEventArgs> Connected;
        event EventHandler Disconnected;

        bool IsConnected { get; }

        void Connect();
        void Disconnect();
    }
}
