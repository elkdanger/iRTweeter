using System;
using System.IO;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;
using iRTweeter.App.Authentication;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Twitter;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace iRTweeter.App
{
    public class Startup
    {
        public static TwitterAuthenticationOptions TwitterAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
#if DEBUG
            var fileSystem = new PhysicalFileSystem(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../www"));
#else
            var fileSystem = new PhysicalFileSystem("www");
#endif
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            TwitterAuthOptions = new TwitterAuthenticationOptions
            {
                ConsumerKey = "O5EBZfmI2600bkMSj8lFENuGr",
                ConsumerSecret = "TAui2aFdrP0dcCo2qiNKRIwmxCwCzKDYjU7hhJHzO71Paeclse",
                Provider = new TwitterAuthProvider()
            };

            app.UseTwitterAuthentication(TwitterAuthOptions);

            var fileServerOptions = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = fileSystem,
                StaticFileOptions =
                {
                    FileSystem = fileSystem,
                    ServeUnknownFileTypes = false
                },
                DefaultFilesOptions =
                {
                    DefaultFileNames = new[] { "index.html" }
                }
            };

            app.UseFileServer(fileServerOptions);

            app.MapSignalR();

            // Web api
            var webApiConfig = new HttpConfiguration();

            webApiConfig.MapHttpAttributeRoutes();

            webApiConfig.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            app.UseWebApi(webApiConfig);

            AuthenticationHelper.LoadTokenData();
        }
    }
}
