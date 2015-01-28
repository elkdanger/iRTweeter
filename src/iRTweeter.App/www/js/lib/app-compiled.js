(function (app) {

    app.moduleName = "irtweeter";

    // SignalR hubs
    app.connection = $.connection.hub.start();
    app.AppServices = $.connection.appHub;

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
        .controller('HeaderController', ['$scope', 'SignalRProxy', 'AuthenticationService', function ($scope, SignalRProxy, authSvc) {

            $scope.isConnected = false;

            var proxy = new SignalRProxy('authenticationHub', {}, function () {
                
                $scope.isConnected = true;

                proxy.on('SignOut', function () {
                    $isConnected = false;
                    $scope.authInfo = null;
                });
            });

            authSvc.getUser().then(displayUserInfo);

            function displayUserInfo(user) {
                
                if (user) {
                    $scope.authInfo = {
                        username: user.ScreenName,
                        imageUrl: user.ProfileImageUrl
                    };
                }
            }

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

(function (app) {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', 'AuthenticationService', function ($scope, $http, auth) {

            $scope.saved = false;

            //app.connection.done(function () {
            //    app.AppServices.server.getAuthenticatedUser().done(function (user) {

            //        $scope.$apply(function () {
            //            $scope.isConnectedToTwitter = user != undefined;

            //            if (user) {
            //                $scope.authInfo = {
            //                    username: user.ScreenName,
            //                    name: user.Name,
            //                    url: user.Url,
            //                    imageUrl: user.ProfileImageUrl
            //                };
            //            }
            //        });

            //    });
            //});

            auth.getUser().then(function (user) {
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

                auth.signOut().success(function () {
                    $scope.isConnectedToTwitter = false;
                    $scope.authInfo = null;
                });

            }

            $scope.twitterAuth = function () {

                var redirectUrl = location.protocol + "//" + location.host + "#/settings";
                var url = "/api/auth/external?redirect_uri=" + redirectUrl;

                window.location = url;
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

                signOut: function () {
                    var _this = this;

                    return $http.put("/api/auth/signOut")
                        .success(function () {
                            debugger;
                            _this.user = null;
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
(function (app) {
    'use strict';

    angular.module(app.moduleName)
        .factory('SignalRProxy', ['$rootScope', function ($rootScope) {

            function SignalRProxyFactory(hubName, startOptions, doneCallback) {

                var connection = $.hubConnection();
                var proxy = connection.createHubProxy(hubName);

                // Dummy event to get things working
                proxy.on('tmp', function () { });

                connection.start().done(function () {
                    $rootScope.$apply(doneCallback);
                });

                return {
                    connection: connection,

                    on: function (eventName, callback) {
                        proxy.on(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback)
                                    callback(result);
                            });
                        });

                        return this;
                    },

                    off: function (eventName, callback) {
                        proxy.off(eventName, function (result) {
                            $rootScope.$apply(function () {
                                if (callback)
                                    callback(result);
                            });
                        });

                        return this;
                    },

                    invoke: function (methodName, callback) {
                        proxy.invoke(methodName)
                            .done(function (result) {
                                $rootScope.$apply(function () {
                                    if (callback)
                                        callback(result);
                                });
                            });

                        return this;
                    }
                }
            };

            return SignalRProxyFactory;
        }]);

})(window.App = window.App || {});