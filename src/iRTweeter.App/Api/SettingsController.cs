using System.Web.Http;
using iRTweeter.App.Config;

namespace iRTweeter.App.Api
{
    public class SettingsController : ApiController
    {
        public IConfig Get()
        {
            return AppConfiguration.Current;
        }
    }
}
