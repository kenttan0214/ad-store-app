'use strict';
module.exports = function(app) {

app.factory('serviceBase', ['$q',  function($q) {
    var baseUrl = variable.environment.apiUrl;

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
