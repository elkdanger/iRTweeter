using System;
using iRacingSdkWrapper;
using iRTweeter.Contracts;
using iRTweeter.Types.Events;

namespace iRTweeter.Sim
{
    public partial class SimProcessor : ISimProcessor
    {
        private SdkWrapper sdk = new SdkWrapper();

        /// <summary>
        /// Initializes a new instance of the <see cref="SimProcessor"/> class.
        /// </summary>
        public SimProcessor()
        {
            this.SetupSdk();
        }

        /// <summary>
        /// Raised when the sim has connected
        /// </summary>
        public event EventHandler<SimConnectedEventArgs> Connected;

        /// <summary>
        /// Raised when the sim has disconnected
        /// </summary>
        public event EventHandler Disconnected;

        /// <summary>
        /// Gets a value indicating whether this instance is connected.
        /// </summary>
        public bool IsConnected { get; private set; }

        /// <summary>
        /// Connects to the sim
        /// </summary>
        public void Connect()
        {
            this.sdk.Start();
        }

        /// <summary>
        /// Disconnects from the sim
        /// </summary>
        public void Disconnect()
        {
            this.sdk.Stop();
        }

        /// <summary>
        /// Setups the SDK.
        /// </summary>
        private void SetupSdk()
        {
            this.sdk.Connected += (s, e) =>
            {
                this.IsConnected = true;

                if (this.Connected != null)
                    this.Connected(this, new SimConnectedEventArgs(new SimConnection()));
            };

            this.sdk.Disconnected += (s, e) =>
            {
                this.IsConnected = false;

                if (this.Disconnected != null)
                    this.Disconnected(this, new EventArgs());
            };
        }
    }
}
