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

$(function () {
    // Other global, possibly non-angular stuff
    $("body").on("click", "[external]", function (e) {
        e.preventDefault();

        window.open(this.href);
    });
});
(function () {

    angular.module(App.moduleName)
        .controller('AboutController', ['$scope', function ($scope) {

        }]);

})();
(function () {

    angular.module(App.moduleName)
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
        .controller('SettingsController', ['$scope', '$http', function ($scope, $http) {

            $scope.saved = false;

            $http.get('/api/settings')
                .success(function (result) {

                    $scope.settings = result;

                });

            $scope.save = function (settings) {

                $scope.saved = false;

                $http.put("/api/settings", settings)
                    .success(function () {
                        $scope.saved = true;
                        $scope.settingsForm.$setPristine();
                    });
            };

        }]);

})();

(function () {

    angular.module(App.moduleName)
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