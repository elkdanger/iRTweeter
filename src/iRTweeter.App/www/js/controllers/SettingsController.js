
(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', '$http', function ($scope, $http) {
    
            $http.get('/api/settings')
                .success(function (result) {

                    $scope.settings = result;

                });

            $scope.save = function (settings) {
                console.log(settings);
            };

        }]);

})();