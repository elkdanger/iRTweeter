using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Windows.Forms;
using iRTweeter.App.Config;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace iRTweeter.App
{
    static class Program
    {
        static IContainer components = new System.ComponentModel.Container();
        private static IConfig config;
        private static NotifyIcon trayIcon;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            BootstrapComponents();

            config = ConfigurationContainer.Load();

            var hostUri = config.Server.GetHostUri();

            WebApp.Start<Startup>(hostUri.ToString());

            if (config.RunSettingsOnStart)
            {
                OpenSettings();
            }

            Application.Run();
        }

        /// <summary>
        /// Bootstraps the windows components.
        /// </summary>
        private static void BootstrapComponents()
        {
            trayIcon = new NotifyIcon(components);
            trayIcon.Icon = ((System.Drawing.Icon)(Properties.Resources.ResourceManager.GetObject("trayIcon")));
            trayIcon.Text = "iRTweeter";
            trayIcon.Visible = true;

            var contextMenu = new ContextMenu(new[] {
                new MenuItem("Settings", (sender, args) => OpenSettings()),
                new MenuItem("-"),
                new MenuItem("Exit", (sender, args) => ExitApp())
            });

            trayIcon.ContextMenu = contextMenu;
        }

        /// <summary>
        /// Opens the settings dashboard
        /// </summary>
        static void OpenSettings()
        {
            Process.Start(config.Server.GetHostUri().ToString());
        }

        /// <summary>
        /// Closes the application
        /// </summary>
        static void ExitApp()
        {
            Application.Exit();
        }
    }

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
