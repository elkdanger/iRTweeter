(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'AuthenticationService', function ($scope, auth) {

            $scope.isConnected = false;

            auth.init().success(function () {
                
                if (auth.user) {
                    $scope.isConnected = true;

                    $scope.authInfo = {
                        username: auth.user.ScreenName,
                        name: auth.user.Name,
                        url: auth.user.Url,
                        imageUrl: auth.user.ProfileImageUrl
                    };
                }
            });

        }]);

})();