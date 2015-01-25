using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security.Twitter;

namespace iRTweeter.App.Authentication
{
    class TwitterAuthProvider : TwitterAuthenticationProvider
    {
        public override Task Authenticated(TwitterAuthenticatedContext context)
        {
            context.Identity.AddClaim(new Claim("ExternalAccessToken", context.AccessToken));
            context.Identity.AddClaim(new Claim("ExternalAccessTokenSecret", context.AccessTokenSecret));

            return Task.FromResult<object>(null);
        }
    }
}
