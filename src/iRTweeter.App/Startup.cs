using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace iRTweeter.App
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var fileSystem = new PhysicalFileSystem("www");

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
        }
    }
}
