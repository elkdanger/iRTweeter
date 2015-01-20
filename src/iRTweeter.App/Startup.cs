using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using iRTweeter.App.Hubs;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace iRTweeter.App
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
#if DEBUG
            var fileSystem = new PhysicalFileSystem(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../www"));
#else
            var fileSystem = new PhysicalFileSystem("www");
#endif
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
        }
    }
}
