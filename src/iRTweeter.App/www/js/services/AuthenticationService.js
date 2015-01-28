
(function () {

    angular.module(App.moduleName)
        .service('AuthenticationService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

            var Svc = function () {

                this.user = null;

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
                },

                signOut: function () {
                    var _this = this;

                    return $http.put("/api/auth/signOut")
                        .success(function () {
                            debugger;
                            _this.user = null;
                        });
                },

                getUser: function () {
                    
                    var _this = this;
                    var deferred = $q.defer();

                    if (this.user != null) {
                        deferred.resolve(this.user);
                    }
                    else {
                        this.init().success(function (result) {
                            deferred.resolve(result);
                        }).error(function () {
                            deferred.reject();
                        });
                    }

                    return deferred.promise;
                }

            };

            return new Svc();
        }]);
})();