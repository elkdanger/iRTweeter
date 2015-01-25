
(function(app) {

    angular.module(app.moduleName)
        .service("TwitterService", ['$http', function ($http) {

            return {

                auth: function () {

                    /*var url = 'https://api.twitter.com/oauth/request_token';
                    var consumerSecret = 'TAui2aFdrP0dcCo2qiNKRIwmxCwCzKDYjU7hhJHzO71Paeclse';
                    debugger;
                    var signature = oauthSignature.generate('post', url, {}, consumerSecret);
                    var timestamp = new Date().getTime();
                    var id = uuid.v4();

                    var data = {
                        oauth_callback: "http://localhost:6060/twitter/callback",
                        oauth_consumer_key: "O5EBZfmI2600bkMSj8lFENuGr",
                        oauth_timestamp: timestamp,
                        oauth_nonce: id,
                        oauth_signature: signature,
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_version: "1.0"
                    };

                    $http.post(url, data)
                        .success(function (result, status) {
                            debugger;
                        })
                        .error(function (data, status, headers) {
                            debugger;
                        });*/

                    $http.post('/api/twitter/token')
                        .success(function (result) {

                            debugger;

                        });

                }

            };

        }]);

})(window.App = window.App || {})