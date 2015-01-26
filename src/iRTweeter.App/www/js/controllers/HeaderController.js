(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'AuthenticationService', function ($scope, auth) {

            $scope.isConnected = false;

            auth.getUser().then(function (user) {
                $scope.authInfo = {
                    username: user.ScreenName,
                    name: user.Name,
                    url: user.Url,
                    imageUrl: user.ProfileImageUrl
                };
            });

        }]);

})();