(function (app) {

    app.moduleName = "irtweeter";

    $.get("/api/auth/user")
        .then(function (data) {
            console.log(data);
        });

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
        .controller('HeaderController', ['$scope', 'AuthenticationService', function ($scope, auth) {

            $scope.isConnected = false;

            auth.init().success(function () {
                
                if (auth.user) {
                    $scope.isConnected = true;

                    $scope.authInfo = {
                        username: auth.user.ScreenName,
                        name: auth.user.Name,
                        url: auth.user.Url,
                        imageUrl: auth.user.ProfileImageUrl
                    };
                }
            });

        }]);

})();
(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        }])

})();

(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', 'AuthenticationService', function ($scope, $http, auth) {

            $scope.saved = false;
            
            function setAuthInfo(user) {
                $scope.isConnectedToTwitter = auth.user != undefined;

                if (auth.user) {
                    $scope.authInfo = {
                        username: auth.user.ScreenName,
                        name: auth.user.Name,
                        url: auth.user.Url,
                        imageUrl: auth.user.ProfileImageUrl
                    };
                }
            }

            setAuthInfo(auth.user);

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

            $scope.twitterAuth = function () {

                var redirectUrl = location.protocol + "//" + location.host + "#/settings";
                var url = "/api/auth/external?redirect_uri=" + redirectUrl;

                window.location = url;
            };

            $scope.$on("socialConnected", function (user) {
                console.log("Socially connected!");

                setAuthInfo(user);
            });

        }]);

})();

(function () {

    angular.module(App.moduleName)
        .service('AuthenticationService', ['$http', '$rootScope', function ($http, $rootScope) {

            var Svc = function () {
            };

            Svc.prototype = {

                /**
                 * Initialises the authentication service
                 */
                init: function () {

                    var _this = this;

                    return $http.get("/api/auth/user")
                        .success(function (user) {
                            _this.user = user;

                            $rootScope.$broadcast("socialConnected", user);

                        });
                }

            };

            return new Svc();

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