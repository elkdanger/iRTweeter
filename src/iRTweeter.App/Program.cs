using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace iRTweeter.App
{
    static class Program
    {
        static IContainer components = new System.ComponentModel.Container();

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            var trayIcon = new NotifyIcon(components);

            trayIcon.Icon = ((System.Drawing.Icon)(Properties.Resources.ResourceManager.GetObject("trayIcon")));
            trayIcon.Text = "iRTweeter";
            trayIcon.Visible = true;

            var contextMenu = new ContextMenu( new [] {
                new MenuItem("Settings"),
                new MenuItem("-"),
                new MenuItem("Exit", (sender, args) => Application.Exit())
            });

            trayIcon.ContextMenu = contextMenu;

            Application.Run();
        }
    }
}
