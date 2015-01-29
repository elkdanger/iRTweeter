using System.Threading.Tasks;

namespace iRTweeter.Sim
{
    public class SimProcessor
    {
        private static object lockObject = new object();

        private static SimProcessor current = null;
        public static SimProcessor Current
        {
            get
            {
                if (current == null)
                    lock (lockObject)
                        if (current == null)
                            current = new SimProcessor();
                return current;
            }
        }

        public bool IsConnected { get; private set; }

        /// <summary>
        /// Connects to the sim
        /// </summary>
        public Task<ISimConnection> Connect()
        {
            return Task.Run<ISimConnection>(async () =>
            {
                await Task.Delay(1000);

                this.IsConnected = true;

                return new SimConnection();
            });
        }

        /// <summary>
        /// Disconnects from the sim
        /// </summary>
        public void Disconnect()
        {
            this.IsConnected = false;
        }
    }
}
