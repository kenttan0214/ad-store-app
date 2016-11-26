'use strict';
module.exports = function(app) {
    app.factory('lazyLoad', ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {

        function bootstrap(libs) {
            for (var i in libs) {
                var lib = libs[i];
                $ocLazyLoad.load({
                    name: lib
                });
            }
        }

        function bootstrapComponents(resolve, modules) {
            for(var i in modules) {
                var module = modules[i];
                
                $ocLazyLoad.load({
                    name: module.name
                });
                
                resolve(module.controller);
                resolve(module.factory);
                resolve(module.service);
                resolve(module.filter);
                resolve(module.directive);
            }
        }

        return {
            bootstrap: bootstrap,
            bootstrapComponents: bootstrapComponents
        };
    }]);
}