(function (app) {
    'use strict';

    angular.module(app.moduleName)
        .factory('SignalRProxy', ['$rootScope', function ($rootScope) {

            function SignalRProxyFactory(hubName, startOptions, doneCallback) {

                var connection = $.hubConnection();
                var proxy = connection.createHubProxy(hubName);

                // Dummy event to get things working
                proxy.on('tmp', function () { });

                connection.start().done(function () {
                    $rootScope.$apply(doneCallback);
                });

                return {
                    connection: connection,

                    on: function (eventName, callback) {
                        proxy.on(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback)
                                    callback(result);
                            });
                        });

                        return this;
                    },

                    off: function (eventName, callback) {
                        proxy.off(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback)
                                    callback(result);
                            });
                        });

                        return this;
                    },

                    invoke: function (methodName, callback) {
                        proxy.invoke(methodName)
                            .done(function (result) {
                                $rootScope.$apply(function () {
                                    if (callback)
                                        callback(result);
                                });
                            });

                        return this;
                    }
                }
            };

            return SignalRProxyFactory;
        }]);

})(window.App = window.App || {});