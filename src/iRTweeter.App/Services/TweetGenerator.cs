using iRTweeter.Contracts;

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
