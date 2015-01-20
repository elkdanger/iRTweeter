(function (app) {

    app.moduleName = "irtweeter";

    angular.module(app.moduleName, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: '/views/index.html',
                    controller: 'HomeController'
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'SettingsController'
                })
                .when('/about', {
                    templateUrl: '/views/about.html',
                    controller: 'AboutController'
                })
                .otherwise({
                    redirectTo: '/'
                });

        }]);

})(window.App = window.App || {});
(function () {

    angular.module(App.moduleName)
        .controller('AboutController', ['$scope', function ($scope) {

        }]);

})();
(function () {

    angular.module('irtweeter')
        .controller('HeaderController', ['$scope', function ($scope) {

        }]);

})();
(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        }])

})();

(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', function ($scope) {

            $scope.settings = {
                port: 6060,
                runOnWindowsStart: true,
                autoOpenDash: false
            };

            $scope.save = function (settings) {
                console.log(settings);
            };

        }]);

})();

(function () {

    angular.module('irtweeter')
        .service('SignalRService', function () {

            var proxy = null;

            return {
                initialise: function () {

                    connection = $.hubConnection();

                    this.proxy = connection.createHubProxy('settingsHub');

                    connection.start()
                        .done(function () {
                            console.log("Connected to hub");
                            $rootScope.connected = true;
                        });
                }
            };

        });

})();