using System;
using System.ComponentModel.Design;

namespace iRTweeter.Types
{
    public interface IDependencyResolver : IServiceContainer
    {
        T GetService<T>() where T : class;
        void AddService<T>() where T : class, new();
        void AddService<T>(Type type);
        void AddService<T, U>() where U : class, new();
    }

    public class DependencyResolver : IDependencyResolver
    {
        #region Singleton

        private static object lockObject = new object();
        private static DependencyResolver resolver;

        public static IDependencyResolver Current
        {
            get
            {
                if (resolver == null)
                    lock (lockObject)
                        if (resolver == null)
                            resolver = new DependencyResolver();
                return resolver;
            }
        }
        #endregion

        private ServiceContainer container = new ServiceContainer();

        private DependencyResolver()
        {
        }

        /// <summary>
        /// Adds the service.
        /// </summary>
        public void AddService<T>()
            where T: class, new()
        {
            this.container.AddService(typeof(T), Activator.CreateInstance(typeof(T)));
        }

        /// <summary>
        /// Adds the service.
        /// </summary>
        public void AddService<T>(Type t)
        {
            this.container.AddService(typeof(T), Activator.CreateInstance(t));
        }

        /// <summary>
        /// Adds the service.
        /// </summary>
        public void AddService<T, U>()
            where U: class, new()
        {
            this.container.AddService(typeof(T), Activator.CreateInstance(typeof(U)));
        }

        /// <summary>
        /// Adds the specified service to the service container, and optionally promotes the service to parent service containers.
        /// </summary>
        /// <param name="serviceType">The type of service to add.</param>
        /// <param name="callback">A callback object that is used to create the service. This allows a service to be declared as available, but delays the creation of the object until the service is requested.</param>
        /// <param name="promote">true to promote this request to any parent service containers; otherwise, false.</param>
        public void AddService(Type serviceType, ServiceCreatorCallback callback, bool promote)
        {
            this.container.AddService(serviceType, callback, promote);
        }

        /// <summary>
        /// Adds the specified service to the service container.
        /// </summary>
        /// <param name="serviceType">The type of service to add.</param>
        /// <param name="callback">A callback object that is used to create the service. This allows a service to be declared as available, but delays the creation of the object until the service is requested.</param>
        public void AddService(Type serviceType, ServiceCreatorCallback callback)
        {
            this.container.AddService(serviceType, callback);
        }

        /// <summary>
        /// Adds the specified service to the service container, and optionally promotes the service to any parent service containers.
        /// </summary>
        /// <param name="serviceType">The type of service to add.</param>
        /// <param name="serviceInstance">An instance of the service type to add. This object must implement or inherit from the type indicated by the <paramref name="serviceType" /> parameter.</param>
        /// <param name="promote">true to promote this request to any parent service containers; otherwise, false.</param>
        public void AddService(Type serviceType, object serviceInstance, bool promote)
        {
            this.container.AddService(serviceType, serviceInstance, promote);
        }

        /// <summary>
        /// Adds the specified service to the service container.
        /// </summary>
        /// <param name="serviceType">The type of service to add.</param>
        /// <param name="serviceInstance">An instance of the service type to add. This object must implement or inherit from the type indicated by the <paramref name="serviceType" /> parameter.</param>
        public void AddService(Type serviceType, object serviceInstance)
        {
            this.container.AddService(serviceType, serviceInstance);
        }

        /// <summary>
        /// Removes the specified service type from the service container, and optionally promotes the service to parent service containers.
        /// </summary>
        /// <param name="serviceType">The type of service to remove.</param>
        /// <param name="promote">true to promote this request to any parent service containers; otherwise, false.</param>
        public void RemoveService(Type serviceType, bool promote)
        {
            this.container.RemoveService(serviceType, promote);
        }

        /// <summary>
        /// Removes the specified service type from the service container.
        /// </summary>
        /// <param name="serviceType">The type of service to remove.</param>
        public void RemoveService(Type serviceType)
        {
            this.container.RemoveService(serviceType);
        }

        /// <summary>
        /// Gets the service object of the specified type.
        /// </summary>
        /// <param name="serviceType">An object that specifies the type of service object to get.</param>
        /// <returns>
        /// A service object of type <paramref name="serviceType" />.-or- null if there is no service object of type <paramref name="serviceType" />.
        /// </returns>
        public object GetService(Type serviceType)
        {
            return this.container.GetService(serviceType);
        }

        /// <summary>
        /// Gets the service.
        /// </summary>
        /// <typeparam name="T">The type to get</typeparam>
        public T GetService<T>()
            where T : class
        {
            return this.container.GetService(typeof(T)) as T;
        }
    }
}
