'use strict';
module.exports = function(app) {
    app.controller('CheckoutCtrl', [
    	'$scope', 
    	'advertisementServices',
        'priceCalculator',
    function($scope, advertisementServices, priceCalculator) {
    	$scope.advertisementList = [];
        $scope.updateSubtotal = updateSubtotal;

    	advertisementServices.getAdvertisementList().then(
    		getAdListSuccess, getAdListFailed
    	);

    	function getAdListSuccess(res) {
            $scope.advertisementList = Array.from(res);
    	}

    	function getAdListFailed(res) {
    		console.log(res);
    	}

        function updateSubtotal(ad) {
            if (ad.qty > 0) {
                ad.subTotal = priceCalculator.adSubTotal(ad);
            }
        }
    }]);
    return app;
}