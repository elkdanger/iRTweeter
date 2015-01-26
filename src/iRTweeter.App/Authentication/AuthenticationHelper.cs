using System.Net;
using TweetSharp;

namespace iRTweeter.App.Authentication
{
    class AuthenticationHelper
    {
        private static ExternalTokenData tokenData = null;

        public static TwitterUser AuthenticatedTwitterUser { get; private set; }

        /// <summary>
        /// Gets the token data.
        /// </summary>
        public static ExternalTokenData TokenData
        {
            get
            {
                tokenData = tokenData ?? ExternalTokenData.LoadTokenData();
                return tokenData;
            }
        }

        /// <summary>
        /// Creates the twitter service.
        /// </summary>
        public static TwitterService CreateTwitterService()
        {
            if (TokenData == null)
                return null;

            return new TwitterService(Startup.TwitterAuthOptions.ConsumerKey, Startup.TwitterAuthOptions.ConsumerSecret, TokenData.ExternalAccessToken, TokenData.ExternalAccessTokenSecret);
        }

        /// <summary>
        /// Signs the user in.
        /// </summary>
        public static void SignIn()
        {
            if (TokenData != null)
            {
                var service = AuthenticationHelper.CreateTwitterService();

                try
                {
                    AuthenticatedTwitterUser = service.VerifyCredentials(new VerifyCredentialsOptions());
                }
                catch (WebException)
                {
                    SignOut();
                }
            }
        }

        /// <summary>
        /// Signs the out.
        /// </summary>
        public static void SignOut()
        {
            tokenData = null;
            AuthenticatedTwitterUser = null;
            ExternalTokenData.ClearTokenData();
        }
    }
}
