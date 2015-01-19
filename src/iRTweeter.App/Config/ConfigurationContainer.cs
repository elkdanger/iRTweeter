using System;
using System.IO;
using Newtonsoft.Json;

namespace iRTweeter.App.Config
{
    public class ConfigurationContainer : IConfig
    {
        /// <summary>
        /// Loads the specified filename.
        /// </summary>
        /// <param name="filename">The filename.</param>
        public static IConfig Load(string filename = "config.json")
        {
            var json = File.ReadAllText(filename);
            var config = JsonConvert.DeserializeObject<ConfigurationContainer>(json);

            return config;
        }

        /// <summary>
        /// Gets or sets a value indicating whether the settings page should be opened once the server starts
        /// </summary>
        public bool RunSettingsOnStart { get; set; }

        /// <summary>
        /// Gets or sets the server settings
        /// </summary>
        [JsonConverter(typeof(ConcreteTypeConverter<ServerConfig>))]
        public IServerConfig Server { get; set; }
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
        bool RunSettingsOnStart { get; }
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
