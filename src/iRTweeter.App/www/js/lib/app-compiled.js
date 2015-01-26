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

            auth.getUser().done(function (user) {
                debugger;
                $scope.authInfo = {
                    username: user.ScreenName,
                    name: user.Name,
                    url: user.Url,
                    imageUrl: user.ProfileImageUrl
                };
            });

        }]);

})();
(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope',  function ($scope) {

            $scope.$on('socialConnected', function (user) {
                console.log("Socially connected");
            });

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
                setAuthInfo(user);
            });

        }]);

})();

(function () {

    angular.module(App.moduleName)
        .service('AuthenticationService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

            var Svc = function () {

                this.user = null;

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
                },

                getUser: function () {
                    debugger;
                    var _this = this;
                    var deferred = $q.defer();

                    if (this.user != null) {
                        deferred.resolve(this.user);
                    }
                    else {
                        this.init().success(function (result) {
                            deferred.resolve(result);
                        }).error(function () {
                            deferred.reject();
                        });
                    }

                    return deferred.promise;
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