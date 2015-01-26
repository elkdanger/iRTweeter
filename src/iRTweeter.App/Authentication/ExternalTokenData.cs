using System.IO;
using System.Security.Claims;
using Newtonsoft.Json;

namespace iRTweeter.App.Authentication
{
    class ExternalTokenData
    {
        private const string TOKEN_FILE = ".token";

        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public string UserName { get; set; }
        public string ExternalAccessToken { get; set; }
        public string ExternalAccessTokenSecret { get; set; }

        internal static ExternalTokenData FromIdentity(System.Security.Claims.ClaimsIdentity claimsIdentity)
        {
            if(claimsIdentity == null)
            {
                return null;
            }

            Claim providerKeyClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);

            if(providerKeyClaim == null || string.IsNullOrWhiteSpace(providerKeyClaim.Issuer) || string.IsNullOrWhiteSpace(providerKeyClaim.Value))
                return null;

            if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                return null;

            return new ExternalTokenData
            {
                LoginProvider = providerKeyClaim.Issuer,
                ProviderKey = providerKeyClaim.Value,
                UserName = claimsIdentity.FindFirst(ClaimTypes.Name).Value,
                ExternalAccessToken = claimsIdentity.FindFirst("ExternalAccessToken").Value,
                ExternalAccessTokenSecret = claimsIdentity.FindFirst("ExternalAccessTokenSecret").Value
            };
        }

        /// <summary>
        /// Loads the token data.
        /// </summary>
        public static ExternalTokenData LoadTokenData()
        {
            if (!File.Exists(TOKEN_FILE))
                return null;

            var json = File.ReadAllText(TOKEN_FILE);
            var data = JsonConvert.DeserializeObject<ExternalTokenData>(json);

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

        /// <summary>
        /// Writes the specified token data.
        /// </summary>
        public static void Write(ExternalTokenData tokenData)
        {
            var json = JsonConvert.SerializeObject(tokenData);
            File.WriteAllText(TOKEN_FILE, json);
        }
    }
}
