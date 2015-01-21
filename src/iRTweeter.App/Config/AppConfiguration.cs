using System;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace iRTweeter.App.Config
{
    public class AppConfiguration : IConfig
    {
        private static IConfig currentConfiuration;
        private static object configLock = new object();

#if DEBUG
        private const string configFilename = "config.debug.json";
#else
        private const string configFilename = "config.json";
#endif

        public static IConfig Current
        {
            get
            {
                if(currentConfiuration == null)
                {
                    lock(configLock)
                    {
                        if(currentConfiuration == null)
                        {
                            currentConfiuration = Load();
                        }
                    }
                }

                return currentConfiuration;
            }

            private set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("value");
                }
                
                lock(configLock)
                {
                    currentConfiuration = value;
                }
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether the settings page should be opened once the server starts
        /// </summary>
        public bool OpenDashboardOnApplicationStart { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the app is in debug mode or not
        /// </summary>
        public bool DebugMode { get; set; }

        /// <summary>
        /// Gets or sets the server settings
        /// </summary>
        [JsonConverter(typeof(ConcreteTypeConverter<ServerConfig>))]
        public IServerConfig Server { get; set; }

        /// <summary>
        /// Loads the specified filename.
        /// </summary>
        /// <param name="filename">The filename.</param>
        private static IConfig Load()
        {
            var json = File.ReadAllText(configFilename);
            var config = JsonConvert.DeserializeObject<AppConfiguration>(json);

            return config;
        }

        /// <summary>
        /// Sets the configuration.
        /// </summary>
        /// <param name="config">The configuration.</param>
        public static Task SetConfiguration(IConfig config)
        {
            return new TaskFactory().StartNew(() =>
            {
                Current = config;

                var json = JsonConvert.SerializeObject(config, new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver(),
                        Formatting = Formatting.Indented
                    });

                File.WriteAllText(configFilename, json);
            });
        }
    }

    /// <summary>
    /// Configuration for the server
    /// </summary>
    public class ServerConfig : IServerConfig
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ServerConfig"/> class.
        /// </summary>
        public ServerConfig()
        {
            this.Port = 8080;
        }

        /// <summary>
        /// Gets or sets the port.
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// Gets the host URI.
        /// </summary>
        public Uri GetHostUri()
        {
            return new UriBuilder("http", "localhost", this.Port).Uri;
        }
    }

    /// Interfaces

    public interface IConfig
    {
        bool OpenDashboardOnApplicationStart { get; }
        bool DebugMode { get; }
        IServerConfig Server { get; }
    }

    public interface IServerConfig
    {
        int Port { get; }
        Uri GetHostUri();
    }

    /// Converters

    // http://blog.greatrexpectations.com/2012/08/30/deserializing-interface-properties-using-json-net/
    internal class ConcreteTypeConverter<T> : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return serializer.Deserialize<T>(reader);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            serializer.Serialize(writer, value);
        }
    }
}
