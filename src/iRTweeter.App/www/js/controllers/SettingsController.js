
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