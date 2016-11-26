'use strict';
module.exports = function(app, apiUrl) {
    app.factory('serviceBase', ['$q',  function($q) {
        var baseUrl = "";

        if (typeof variable != 'undefined') {
            baseUrl = variable.environment.apiUrl;
        } else if (typeof apiUrl != 'undefined') {
            baseUrl = apiUrl;
        } else {
            console.log('api url not found!');
        }

        return {
            getBaseUrl: function() {
                return baseUrl;
            },
            getCB: function() {
                var defer = $q.defer();
                return {
                    success: function(res) {
                        defer.resolve(res);
                    },
                    failed: function(res) {
                        defer.reject(res);
                    },
                    defer: defer
                };
            }
        };
    }]);
}
