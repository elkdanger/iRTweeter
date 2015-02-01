using System;

namespace iRTweeter.Sim.EventModel
{
    public class SimConnectedEventArgs : EventArgs
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SimConnectedEventArgs"/> class.
        /// </summary>
        /// <param name="connection">The connection.</param>
        public SimConnectedEventArgs(ISimConnection connection)
        {
            if (connection == null)
            {
                throw new ArgumentNullException("connection");
            }
            
            this.Connection = connection;
        }

        /// <summary>
        /// Gets the connection.
        /// </summary>
        public ISimConnection Connection { get; private set; }
    }
}
