(function () {

    var connectionState = ko.observable(false);

    $.connection.hub.start().done(function () {
        connectionState(true);
    });

    var app = angular.module('irtweeter', ['ngRoute'])
        .config(function ($routeProvider) {

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

        })
        .controller('HomeController', ['$scope', function ($scope) {

        }])
        .controller('SettingsController', ['$scope', function ($scope) {

            $scope.settings = {
                port: 6060,
                runOnWindowsStart: true,
                autoOpenDash: false
            };

            $scope.save = function (settings) {
                console.log(settings);
            };

        }])
        .controller('AboutController', ['$scope', function ($scope) {

        }])
        .controller('LayoutController', ['$scope', function ($scope) {

            $scope.isConnected = connectionState();

            connectionState.subscribe(function (value) {
                $scope.isConnected = value;
                $scope.$apply();
            });

        }]);

})();