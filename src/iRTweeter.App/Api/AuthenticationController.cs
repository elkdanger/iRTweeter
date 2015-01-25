using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Net.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using iRTweeter.App.Api.ActionResults;
using iRTweeter.App.Authentication;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using System.Security.Principal;
using System.Threading;
using System.Net;
using TweetSharp;

namespace iRTweeter.App.Api
{
    public class AuthenticationController : ApiController
    {
        /// <summary>
        /// Gets the authentication.
        /// </summary>
        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        /// <summary>
        /// Gets the external login.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="error">The error.</param>
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("api/auth/external")]
        public async Task<IHttpActionResult> GetExternalLogin(string error = null)
        {
            var redirectUrl = string.Empty;
            var provider = "Twitter";

            if(error != null)
            {
                return this.BadRequest(Uri.EscapeDataString(error));
            }

            if(User == null || User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            var redirectUriValidationResult = this.ValidateClientAndRedirect(this.Request, ref redirectUrl);

            if(!string.IsNullOrWhiteSpace(redirectUriValidationResult))
            {
                return this.BadRequest(redirectUriValidationResult);
            }

            var externalData = ExternalLoginData.FromIdentity(this.User.Identity as ClaimsIdentity);

            if(externalData == null)
            {
                return this.InternalServerError();
            }

            if (externalData.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                AuthenticationHelper.ClearTokenData();
                return new ChallengeResult(provider, this);
            }

            AuthenticationHelper.SetTokenData(externalData);

            return this.Redirect(redirectUrl);
        }

        /// <summary>
        /// Verifies the external access token.
        /// </summary>
        /// <param name="data">The data.</param>
        private Task<ParsedExternalAccessToken> VerifyExternalAccessToken(ExternalLoginData data)
        {
            return new TaskFactory().StartNew(() =>
            {
                ParsedExternalAccessToken parsedToken = null;

                var svc = new TwitterService(Startup.TwitterAuthOptions.ConsumerKey, Startup.TwitterAuthOptions.ConsumerSecret, data.ExternalAccessToken, data.ExternalAccessTokenSecret);

                var options = new VerifyCredentialsOptions();
                var result = svc.VerifyCredentials(options);

                return parsedToken;
            });
        }

        /// <summary>
        /// Validates the client and redirect.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="redirectUriOutput">The redirect URI output.</param>
        private string ValidateClientAndRedirect(HttpRequestMessage request, ref string redirectUriOutput)
        {
            Uri redirectUri;

            var redirectUriString = this.GetQueryString(request, "redirect_uri");

            if(string.IsNullOrWhiteSpace(redirectUriString))
            {
                return "redirect_uri is required";
            }

            if(!Uri.TryCreate(redirectUriString, UriKind.Absolute, out redirectUri))
                return "redirect_uri is invalid";

            redirectUriOutput = redirectUri.AbsoluteUri;

            return string.Empty;
        }

        /// <summary>
        /// Gets the query string.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="key">The key.</param>
        private string GetQueryString(HttpRequestMessage request, string key)
        {
            var queryStrings = request.GetQueryNameValuePairs();

            if (queryStrings == null)
                return null;

            var match = queryStrings.FirstOrDefault(kv => string.Compare(kv.Key, key, true) == 0);

            if (string.IsNullOrWhiteSpace(match.Value))
                return null;

            return match.Value;
        }
    }
}
