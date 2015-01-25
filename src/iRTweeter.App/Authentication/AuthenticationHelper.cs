using System.IO;
using Newtonsoft.Json;
using TweetSharp;

namespace iRTweeter.App.Authentication
{
    class AuthenticationHelper
    {
        private const string TOKEN_FILE = ".token";

        public static ExternalLoginData TokenData = null;

        /// <summary>
        /// Creates the twitter service.
        /// </summary>
        public static TwitterService CreateTwitterService()
        {
            var tokenData = LoadTokenData();

            if (tokenData == null)
                return null;

            return new TwitterService(Startup.TwitterAuthOptions.ConsumerKey, Startup.TwitterAuthOptions.ConsumerSecret, tokenData.ExternalAccessToken, tokenData.ExternalAccessTokenSecret);
        }

        /// <summary>
        /// Saves the token data.
        /// </summary>
        public static void SetTokenData(ExternalLoginData data)
        {
            if(data == null)
            {
                ClearTokenData();
                TokenData = null;

                return;
            }

            var json = JsonConvert.SerializeObject(data);
            File.WriteAllText(TOKEN_FILE, json);

            TokenData = data;
        }

        /// <summary>
        /// Loads the token data.
        /// </summary>
        public static ExternalLoginData LoadTokenData()
        {
            if (!File.Exists(TOKEN_FILE))
                return null;

            var json = File.ReadAllText(TOKEN_FILE);
            var data = JsonConvert.DeserializeObject<ExternalLoginData>(json);

            TokenData = data;

            return data;
        }

        /// <summary>
        /// Clears the token data.
        /// </summary>
        public static void ClearTokenData()
        {
            if (File.Exists(TOKEN_FILE))
                File.Delete(TOKEN_FILE);
        }
    }
}
