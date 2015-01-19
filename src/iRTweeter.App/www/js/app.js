(function () {

    var app = angular.module('irtweeter', ['ngRoute'])
        .config(function ($routeProvider) {
            
            $routeProvider.when('/', {
                templateUrl: '/views/index.html',
                controller: 'HomeController'
            });

        })
        .controller("HomeController", ['$scope', '$routeProvider', function ($scope, $routeProvider) {
            console.log($routeProvider);
        }]);

})();