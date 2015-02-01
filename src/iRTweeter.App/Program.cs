using System;
using System.ComponentModel;
using System.Configuration;
using System.Diagnostics;
using System.Windows.Forms;
using iRTweeter.App.Authentication;
using iRTweeter.App.Config;
using iRTweeter.App.Hubs;
using iRTweeter.Contracts;
using iRTweeter.Sim;
using iRTweeter.Sim.Testing;
using iRTweeter.Types;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;

namespace iRTweeter.App
{
    static class Program
    {
        private static IContainer components = new System.ComponentModel.Container();
        private static NotifyIcon trayIcon;
        private static ISimProcessor currentSimProcessor;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(params string [] args)
        {
            CommandLine.Process(args);

            BootstrapComponents();
            ConfigureServices();

            // Start web server for configuration/dashboard
            var hostUri = AppConfiguration.Current.Server.GetHostUri();
            WebApp.Start<Startup>(hostUri.ToString());

            if (AppConfiguration.Current.OpenDashboardOnApplicationStart)
            {
                OpenSettings();
            }

            // Sign-in authentication
            AuthenticationHelper.SignIn();

            // Wait for a connection to iRacing
            currentSimProcessor = DependencyResolver.Current.GetService<ISimProcessor>();

            currentSimProcessor.Connected += (s, e) =>
            {
                SimHub.Context.Value.All.SimConnected(e.Connection);
            };

            currentSimProcessor.Disconnected += (s, e) =>
            {
                SimHub.Context.Value.All.SimDisconnected();
            };

            currentSimProcessor.Connect();

            Application.Run();
        }

        /// <summary>
        /// Configures the services.
        /// </summary>
        private static void ConfigureServices()
        {
            var dep = DependencyResolver.Current;

            // Add dependencies
            var processorType = CommandLine.DisconnectedMode ? typeof(DisconnectedSimProcessor) : typeof(SimProcessor);
            dep.AddService<ISimProcessor>(processorType);
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
            currentSimProcessor.Disconnect();
            Application.Exit();
        }
    }
}
