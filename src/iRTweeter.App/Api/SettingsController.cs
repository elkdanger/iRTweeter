using System.Threading.Tasks;
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

        public async Task Put(AppConfiguration configuration)
        {
            await AppConfiguration.SetConfiguration(configuration);
        }
    }
}
