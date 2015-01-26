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