(function () {

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

        }]);

})();