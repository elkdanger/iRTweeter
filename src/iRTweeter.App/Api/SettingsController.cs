using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using iRTweeter.App.Config;

namespace iRTweeter.App.Api
{
    public class SettingsController : ApiController
    {
        public IConfig Get()
        {
            return ConfigurationContainer.Load();
        }
    }
}
