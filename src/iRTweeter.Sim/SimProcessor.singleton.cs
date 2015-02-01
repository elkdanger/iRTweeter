
namespace iRTweeter.Sim
{
    public partial class SimProcessor
    {
        private static object lockObject = new object();
        private static SimProcessor current = null;

        /// <summary>
        /// Gets the current sim processor
        /// </summary>
        public static SimProcessor Current
        {
            get
            {
                if (current == null)
                    lock (lockObject)
                        if (current == null)
                            current = new SimProcessor();
                return current;
            }
        }
    }
}
