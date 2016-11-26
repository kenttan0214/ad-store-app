'use strict';
module.exports = function(app) {
    app.factory('advertisementServices', ['$resource', 'serviceBase',
        function($resource, serviceBase) {
            var url = serviceBase.getBaseUrl().concat('advertisements');

            function getAdvertisementResource() {
                return $resource(url, {}, {
                    get: {
                        method: 'GET',
                        isArray: true
                    }
                });
            }

            return {
                getAdvertisementList: function() {
                    var resource = getAdvertisementResource();
                    var cb = serviceBase.getCB();

                    resource.get({}, cb.success, cb.failed);

                    return cb.defer.promise;
                }
            };
        }
    ]);
}