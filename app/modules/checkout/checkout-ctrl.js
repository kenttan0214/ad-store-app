'use strict';
module.exports = function(app) {
    app.controller('CheckoutCtrl', [
    	'$scope', 
    	'advertisementServices',
        'priceCalculator',
    function($scope, advertisementServices, priceCalculator) {
    	$scope.advertisementList = [];
        $scope.updateSubtotal = updateSubtotal;
        $scope.subTotal = 0;

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
            var advertisementList = $scope.advertisementList;
            if (ad.qty >= 0) {
                ad.subTotal = priceCalculator.adSubTotal(ad);
                $scope.subTotal = priceCalculator.allAdSubtotal(advertisementList);
            }
        }
    }]);
    return app;
}