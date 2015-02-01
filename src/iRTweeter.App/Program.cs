using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Net;
using System.Windows.Forms;
using iRTweeter.App.Authentication;
using iRTweeter.App.Config;
using iRTweeter.App.Services;
using iRTweeter.Sim;
using iRTweeter.Types;
using Microsoft.Owin.Hosting;
using TweetSharp;

namespace iRTweeter.App
{
    static class Program
    {
        private static IContainer components = new System.ComponentModel.Container();
        private static NotifyIcon trayIcon;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            BootstrapComponents();
            ConfigureServices();

            var hostUri = AppConfiguration.Current.Server.GetHostUri();

            WebApp.Start<Startup>(hostUri.ToString());

            if (AppConfiguration.Current.OpenDashboardOnApplicationStart)
            {
                OpenSettings();
            }

            AuthenticationHelper.SignIn();

            DependencyResolver.Current.GetService<ISimProcessor>().Connect();

            Application.Run();
        }

        /// <summary>
        /// Configures the services.
        /// </summary>
        private static void ConfigureServices()
        {
            var dep = DependencyResolver.Current;

            // Add dependencies
            dep.AddService<ISimProcessor, SimProcessor>();
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
            Process.Start(AppConfiguration.Current.Server.GetHostUri().ToString());
        }

        /// <summary>
        /// Closes the application
        /// </summary>
        static void ExitApp()
        {
            Application.Exit();
        }
    }
}
