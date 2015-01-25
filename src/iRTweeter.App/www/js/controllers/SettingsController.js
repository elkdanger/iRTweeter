
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