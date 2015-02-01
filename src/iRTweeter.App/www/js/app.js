(function (app) {

    app.moduleName = "irtweeter";

    // SignalR hubs
    app.connection = $.connection.hub.start();
    app.AppServices = $.connection.appHub;

    angular.module(app.moduleName, ['ngRoute', 'ngAnimate'])
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
        }])
        .directive('spinner', function() {
            return {
                templateUrl: '/directives/spinner.html'
            };
        });

})(window.App = window.App || {});

$(function () {
    // Other global, possibly non-angular stuff
    $("body").on("click", "[external]", function (e) {
        e.preventDefault();
        window.open(this.href);
    });
});