(function (app) {

    app.moduleName = "irtweeter";

    // SignalR hubs
    app.connection = $.connection.hub.start();
    app.AppServices = $.connection.appHub;

    app.AppServices.client.signOut = function () {
        debugger;
    };

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
(function () {

    angular.module(App.moduleName)
        .controller('AboutController', ['$scope', function ($scope) {

        }]);

})();
(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'AuthenticationService', 'AppService', function ($scope, auth, appSvc) {

            $scope.isConnected = false;

            App.connection.done(function () {
                App.AppServices.server.getAuthenticatedUser().done(function (user) {

                    $scope.$apply(function () {

                        if (user) {
                            $scope.isConnected = true;

                            $scope.authInfo = {
                                username: user.ScreenName,
                                name: user.Name,
                                url: user.Url,
                                imageUrl: user.ProfileImageUrl
                            };
                        }
                    });
                });
            });
        }]);
})();
(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope', 'AuthenticationService',  function ($scope, auth) {

            $scope.user = null;
            $scope.simConnected = false;

            auth.getUser().then(function (user) {
                if (user) {
                    $scope.user = user;
                }
            });

        }])

})();

(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', 'AuthenticationService', 'AppService', function ($scope, $http, auth, appSvc) {

            $scope.saved = false;

            App.connection.done(function () {
                App.AppServices.server.getAuthenticatedUser().done(function (user) {

                    $scope.$apply(function () {
                        $scope.isConnectedToTwitter = user != undefined;

                        if (user) {
                            $scope.authInfo = {
                                username: user.ScreenName,
                                name: user.Name,
                                url: user.Url,
                                imageUrl: user.ProfileImageUrl
                            };
                        }
                    });

                });
            });

            App.AppServices.client.signOut = function () {
                debugger;
                console.log("Signed out");
            };

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

            $scope.signOut = function () {
                App.AppServices.server.signOut();
            }

            $scope.twitterAuth = function () {

                var redirectUrl = location.protocol + "//" + location.host + "#/settings";
                var url = "/api/auth/external?redirect_uri=" + redirectUrl;

                window.location = url;
            };

        }]);

})();

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