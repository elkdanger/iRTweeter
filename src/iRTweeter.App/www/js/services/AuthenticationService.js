
(function () {

    angular.module(App.moduleName)
        .service('AuthenticationService', ['$http', '$rootScope', function ($http, $rootScope) {

            var Svc = function () {
            };

            Svc.prototype = {

                /**
                 * Initialises the authentication service
                 */
                init: function () {

                    var _this = this;

                    return $http.get("/api/auth/user")
                        .success(function (user) {
                            _this.user = user;

                            $rootScope.$broadcast("socialConnected", user);

                        });
                }

            };

            return new Svc();

        }]);

})();