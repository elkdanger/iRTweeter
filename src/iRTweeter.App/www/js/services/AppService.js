
(function () {

    angular.module(App.moduleName)
        .service('AppService', ['$rootScope', '$q', function ($rootScope, $q) {

            var proxy = null;

            return {
                connect: function () {

                    var _this = this;

                    connection = $.hubConnection();

                    this.proxy = connection.createHubProxy('appHub');

                    return connection.start()
                        .done(function () {
                            $rootScope.connected = true;
                            console.log(_this.proxy);
                        });
                },

                getAuthenticatedUser: function () {
                    return this.proxy.invoke('getAuthenticatedUser');
                }
            };

        }]);

})(window.App = window.App || {});