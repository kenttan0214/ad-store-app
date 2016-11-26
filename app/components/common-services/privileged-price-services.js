'use strict';
module.exports = function(app) {
    app.factory('privilegedPriceServices', ['$resource', 'serviceBase',
        function($resource, serviceBase) {
            var url = serviceBase.getBaseUrl().concat('privileged');

            function getPrivilegedPriceResource() {
                return $resource(url, {
                    customerName: '@customerName'
                }, {
                    get: {
                        method: 'GET',
                        isArray: true
                    }
                });
            }

            return {
                getPrivilegedPriceByCustId: function(queryParams) {
                    var resource = getPrivilegedPriceResource();
                    var cb = serviceBase.getCB();

                    resource.get(queryParams, cb.success, cb.failed);

                    return cb.defer.promise;
                }
            };
        }
    ]);
}