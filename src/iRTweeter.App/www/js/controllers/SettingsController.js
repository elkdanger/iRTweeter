
(function (app) {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', 'AuthenticationService', 'AppService', function ($scope, $http, auth, appSvc) {

            $scope.saved = false;

            app.connection.done(function () {
                app.AppServices.server.getAuthenticatedUser().done(function (user) {

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
            
            app.AppServices.client.signOut = function () {
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

})(window.App = window.App || {});