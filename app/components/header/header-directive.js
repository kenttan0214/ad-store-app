'use strict';
module.exports = function(app) {
    
    app.directive('header', [function() {
        return {
            restrict: 'A',
            template: require('./header.html'),
            link: function(scope, element, attrs) {}
        };
    }]);
}