
(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', function ($scope, $http) {

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

        }]);

})();