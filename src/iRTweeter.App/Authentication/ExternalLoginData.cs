using System.Security.Claims;

namespace iRTweeter.App.Authentication
{
    class ExternalLoginData
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public string UserName { get; set; }
        public string ExternalAccessToken { get; set; }
        public string ExternalAccessTokenSecret { get; set; }

        internal static ExternalLoginData FromIdentity(System.Security.Claims.ClaimsIdentity claimsIdentity)
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

            return new ExternalLoginData
            {
                LoginProvider = providerKeyClaim.Issuer,
                ProviderKey = providerKeyClaim.Value,
                UserName = claimsIdentity.FindFirst(ClaimTypes.Name).Value,
                ExternalAccessToken = claimsIdentity.FindFirst("ExternalAccessToken").Value,
                ExternalAccessTokenSecret = claimsIdentity.FindFirst("ExternalAccessTokenSecret").Value
            };
        }
    }
}
