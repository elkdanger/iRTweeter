using System;
using System.Linq;

namespace iRTweeter.App
{
    public static class CommandLine
    {
        public static bool DisconnectedMode { get; private set; }

        /// <summary>
        /// Processes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        public static void Process(string[] args)
        {
            if (args == null) return;

            if (!args.Any()) return;
    
            // Process commands
            DisconnectedMode = args.Contains("-d", StringComparer.OrdinalIgnoreCase);
        }
    }
}
