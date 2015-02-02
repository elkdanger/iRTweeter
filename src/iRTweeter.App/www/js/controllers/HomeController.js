(function () {

    angular.module(App.moduleName)
        .controller('HomeController', ['$scope', 'AuthenticationService', 'SignalRProxy',  function ($scope, auth, SignalRProxy) {

            $scope.user = null;
            $scope.connectionMode = 'idle';

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
                    $scope.connection = null;
                    $scope.connectionMode = 'idle';
                });

                simProxy.invoke('getSimConnection', function (connection) {
                    onSimConnected(connection);
                });

                simProxy.connection.disconnected(function () {
                    $scope.$apply(function () {
                        $scope.connectionMode = 'disconnected';
                    });
                });

            });

            function onSimConnected(connection) {

                if (!connection) {
                    $scope.simConnected = false;
                    $scope.connection = null;
                    $scope.connectionMode = 'connecting';
                    return;
                }

                $scope.connectionMode = 'connected';
                $scope.connection = connection;
            }

        }])

})();