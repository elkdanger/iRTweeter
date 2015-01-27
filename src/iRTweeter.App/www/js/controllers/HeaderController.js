(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'AuthenticationService', 'AppService', function ($scope, auth, appSvc) {

            $scope.isConnected = false;

            App.connection.done(function () {
                App.AppServices.server.getAuthenticatedUser().done(function (user) {

                    $scope.$apply(function () {

                        if (user) {
                            $scope.isConnected = true;

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
        }]);
})();