using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iRTweeter.Sim;

namespace iRTweeter.App.Services
{
    /// <summary>
    /// Generates Tweets given events from the sim processor
    /// </summary>
    class TweetGenerator
    {
        private ISimConnection connection;

        public TweetGenerator(ISimConnection connection)
        {
            this.connection = connection;
        }
    }
}
