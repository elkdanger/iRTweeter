using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iRTweeter.App.Config;
using Microsoft.AspNet.SignalR;

namespace iRTweeter.App.Hubs
{
    public class SettingsHub : Hub
    {
        public IConfig GetConfiguration()
        {
            return ConfigurationContainer.Load();
        }
    }
}
