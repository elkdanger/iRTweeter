(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'SignalRProxy', 'AuthenticationService', function ($scope, SignalRProxy, authSvc) {

            $scope.isConnected = false;

            var proxy = new SignalRProxy('authenticationHub', {}, function () {
                
                proxy.on('SignOut', function () {
                    $isConnected = false;
                    $scope.authInfo = null;
                });
            });

            authSvc.getUser().then(displayUserInfo);

            function displayUserInfo(user) {
                if (user) {
                    $isConnected = true;

                    $scope.authInfo = {
                        username: user.ScreenName,
                        imageUrl: user.ProfileImageUrl
                    };
                }
            }

        }]);
})();