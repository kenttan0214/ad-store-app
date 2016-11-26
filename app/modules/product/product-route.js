'use strict';
var app = angular.module('kent.adstore.product', []);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('product', {
            url: "/product",
            controller: "ProductCtrl",
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function() {
                        require('./product.less');
                        return resolve(require('./product.html'));
                    });
                });
            },
            resolve: {
                loadModules: function($q, lazyLoad) {
                    return $q(function(resolve) {
                        require.ensure([], function() {
                            lazyLoad.bootstrapComponents(resolve, [
                                require('./product-ctrl')(app)
                            ]);
                        });
                    });
                }
            }
        });
}]);