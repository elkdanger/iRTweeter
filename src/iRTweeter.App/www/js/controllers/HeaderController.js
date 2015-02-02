(function () {

    angular.module(App.moduleName)
        .controller('HeaderController', ['$scope', 'SignalRProxy', 'AuthenticationService', function ($scope, SignalRProxy, authSvc) {

            $scope.isConnected = false;
            $scope.simConnected = false;

            var authProxy = new SignalRProxy('authenticationHub', {}, function () {
                
                $scope.isConnected = true;

                authProxy.on('SignOut', function () {
                    $isConnected = false;
                    $scope.authInfo = null;
                });

                authProxy.connection.disconnected(function () {
                    $scope.$apply(function () {
                        debugger;
                        $scope.isConnected = false;
                        $scope.simConnected = false;
                    })
                });
            });

            var simProxy = new SignalRProxy('simHub', {}, function () {

                simProxy.on('simConnected', function () {
                    onSimConnected();
                });

                simProxy.on('simDisconnected', function () {
                    $scope.simConnected = false;
                });

                simProxy.invoke('getSimConnection', function (result) {
                    onSimConnected(result);
                });
            });

            authSvc.getUser().then(displayUserInfo);

            function displayUserInfo(user) {
                
                if (user) {
                    $scope.authInfo = {
                        username: user.ScreenName,
                        imageUrl: user.ProfileImageUrl
                    };
                }
            }

            function onSimConnected(connection) {
                $scope.simConnected = true;
                $scope.connection = connection;
            }

        }]);
})();