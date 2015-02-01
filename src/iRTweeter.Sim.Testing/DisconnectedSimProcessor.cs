using System;
using System.Threading.Tasks;
using iRTweeter.Contracts;
using iRTweeter.Types.Events;

namespace iRTweeter.Sim.Testing
{
    /// <summary>
    /// Disconnected sim processor, for testing use without iRacing
    /// </summary>
    public class DisconnectedSimProcessor : ISimProcessor
    {
        /// <summary>
        /// Raised when the sim has connected
        /// </summary>
        public event EventHandler<SimConnectedEventArgs> Connected;

        /// <summary>
        /// Raised when the sim has disconnected
        /// </summary>
        public event EventHandler Disconnected;

        /// <summary>
        /// Gets a value indicated whether the sim is connected or not
        /// </summary>
        public bool IsConnected { get; private set; }

        /// <summary>
        /// Gets the current connection.
        /// </summary>
        public ISimConnection CurrentConnection { get; private set; }

        /// <summary>
        /// Connects to the sim
        /// </summary>
        public void Connect()
        {
            Task.Run(async () =>
            {
                await Task.Delay(10000);

                this.CurrentConnection = new SimConnection();

                if (this.Connected != null)
                    this.Connected(this, new SimConnectedEventArgs(this.CurrentConnection));
            });
        }

        /// <summary>
        /// Disconnects from the sim
        /// </summary>
        public void Disconnect()
        {
            this.CurrentConnection = null;

            if (this.Disconnected != null)
                this.Disconnected(this, new EventArgs());
        }
    }
}
