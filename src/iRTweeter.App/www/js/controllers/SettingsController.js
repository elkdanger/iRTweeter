
(function () {

    angular.module(App.moduleName)
        .controller('SettingsController', ['$scope', function ($scope) {

            $scope.settings = {
                port: 6060,
                runOnWindowsStart: true,
                autoOpenDash: false
            };

            $scope.save = function (settings) {
                console.log(settings);
            };

        }]);

})();