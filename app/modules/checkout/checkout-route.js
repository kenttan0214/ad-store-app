'use strict';
var app = angular.module('kent.adstore.checkout', []);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('checkout', {
            url: "/checkout",
            controller: "CheckoutCtrl",
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function() {
                        require('./checkout.less');
                        return resolve(require('./checkout.html'));
                    });
                });
            },
            resolve: {
                loadModules: function($q, lazyLoad) {
                    return $q(function(resolve) {
                        require.ensure([], function() {
                            lazyLoad.bootstrapComponents(resolve, [
                                require('./checkout-ctrl')(app),
                                require('./checkout-price-calculator')(app)
                            ]);
                        });
                    });
                }
            }
        });
}]);