(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope', 'AuthenticationService', 'SignalRProxy',  function ($scope, auth, SignalRProxy) {

            $scope.user = null;
            $scope.simConnected = false;

            auth.getUser().then(function (user) {
                if (user) {
                    $scope.user = user;
                }
            });

            var simProxy = new SignalRProxy('simHub', {}, function () {

                simProxy.on('simConnected', function (connection) {
                    onSimConnected(connection);
                });

                simProxy.on('simDisconnected', function () {
                    $scope.simConnected = false;
                });

                simProxy.invoke('getSimConnection', function (connection) {
                    if(connection)
                        onSimConnected(connection);
                });

            });

            function onSimConnected(connection) {

                if (!connection) return;

                $scope.simConnected = true;
                $scope.connection = connection;
            }

        }])

})();