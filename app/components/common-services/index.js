var common = angular.module('kent.common-services', []);

require('./lazy-load-services')(common);
require('./service-base')(common);