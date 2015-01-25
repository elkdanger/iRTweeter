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
        .controller('SettingsController', ['$scope', '$http', 'TwitterService', function ($scope, $http, twitter) {

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

            $scope.twitterAuth = function () {

                var redirectUrl = location.protocol + "//" + location.host + "#/";
                var url = "http://localhost:6061/api/auth/external?redirect_uri=" + redirectUrl;

                window.location = url;
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

(function(app) {

    angular.module(app.moduleName)
        .service("TwitterService", ['$http', function ($http) {

            return {

                auth: function () {

                    /*var url = 'https://api.twitter.com/oauth/request_token';
                    var consumerSecret = 'TAui2aFdrP0dcCo2qiNKRIwmxCwCzKDYjU7hhJHzO71Paeclse';
                    debugger;
                    var signature = oauthSignature.generate('post', url, {}, consumerSecret);
                    var timestamp = new Date().getTime();
                    var id = uuid.v4();

                    var data = {
                        oauth_callback: "http://localhost:6060/twitter/callback",
                        oauth_consumer_key: "O5EBZfmI2600bkMSj8lFENuGr",
                        oauth_timestamp: timestamp,
                        oauth_nonce: id,
                        oauth_signature: signature,
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_version: "1.0"
                    };

                    $http.post(url, data)
                        .success(function (result, status) {
                            debugger;
                        })
                        .error(function (data, status, headers) {
                            debugger;
                        });*/

                    $http.post('/api/twitter/token')
                        .success(function (result) {

                            debugger;

                        });

                }

            };

        }]);

})(window.App = window.App || {})