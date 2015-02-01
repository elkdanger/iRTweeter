using System;
using iRTweeter.Types.Events;

namespace iRTweeter.Contracts
{
    public interface ISimProcessor
    {
        /// <summary>
        /// Raised when the sim has connected
        /// </summary>
        event EventHandler<SimConnectedEventArgs> Connected;

        /// <summary>
        /// Raised when the sim has disconnected
        /// </summary>
        event EventHandler Disconnected;

        /// <summary>
        /// Gets a value indicated whether the sim is connected or not
        /// </summary>
        bool IsConnected { get; }

        /// <summary>
        /// Connects to the sim
        /// </summary>
        void Connect();

        /// <summary>
        /// Disconnects from the sim
        /// </summary>
        void Disconnect();
    }
}
