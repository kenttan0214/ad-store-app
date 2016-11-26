'use strict';

require('./common');
require('./modules/checkout');

var app = angular.module('kent.adstore', [
	'ngResource', 'ui.router', 'oc.lazyLoad', 
	'kent.common-services',
	'kent.adstore.header',
	'kent.adstore.checkout'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/checkout');
}]);

// Bootstraps app
angular.element(document).ready(function() {
    angular.bootstrap(document, ['kent.adstore']);
});