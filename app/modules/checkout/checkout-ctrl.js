'use strict';
module.exports = function(app) {
    app.controller('CheckoutCtrl', [
    	'$scope', 
    	'advertisementServices',
        'privilegedPriceServices',
        'priceCalculator',
    function($scope, advertisementServices, privilegedPriceServices, priceCalculator) {
    	$scope.advertisementList = [];
        $scope.subTotal = 0;
        $scope.custName = "";
        
        $scope.updateAdSubtotal = updateAdSubtotal;
        $scope.getPrivilegedPrice = getPrivilegedPrice;

        function getAdvertismentList() {
            advertisementServices.getAdvertisementList().then(
                getAdListSuccess, getAdListFailed
            );

            function getAdListSuccess(res) {
                $scope.advertisementList = Array.from(res);
            }

            function getAdListFailed(res) {
                console.log(res);
            }
        }

        function getPrivilegedPrice() {
            var params = {customerName: $scope.custName};
            
            if(params.customerName.length!=0) {
                privilegedPriceServices.getPrivilegedPriceByCustName(params).then(
                    getprivilegedPriceSuccess, getprivilegedPriceFailed
                );
            } else {
                updateAdWithPrivilegedPrice([]);
                updateAllAdSubTotal();
            }

            function getprivilegedPriceSuccess(res) {
                var privilegedPrice = Array.from(res);

                updateAdWithPrivilegedPrice(privilegedPrice);
                updateAllAdSubTotal();
            }

            function getprivilegedPriceFailed(res) {
                console.log(res);
            }
        }

        //sum of single ad subtotal adQty * adPrice
        function updateAdSubtotal(ad, advertisementList) {
            if (ad.qty > 0) {
                ad.subTotal = priceCalculator.adSubTotal(ad);            
            } else {
                ad.subTotal = 0;
            }

            updateAllAdSubTotal();
        }

        //Sum of all the ad sub total price
        function updateAllAdSubTotal() {
            var advertisementList = $scope.advertisementList
            $scope.subTotal = priceCalculator.allAdSubtotal(advertisementList);
        }

        function updateAdWithPrivilegedPrice(privilegedPrice) {
            var advertisementList = $scope.advertisementList;

            $scope.advertisementList = priceCalculator.updateAdWithPrivilegedPrice(
                advertisementList, privilegedPrice
            );
        }

        getAdvertismentList();

    }]);
    return app;
}