'use strict';
module.exports = function(app) {
    app.factory('priceCalculator', [function() {
        var fixedDecimal = 2;

        function toFixedDecimal(value) {
            return parseFloat(value).toFixed(fixedDecimal);
        }

        return {
            adSubTotal: function(ad, privilegedPrice) {
                var subTotal = 0.00;
                if (privilegedPrice) {

                } else {
                    subTotal = ad.stdPrice * ad.qty;
                }
                return toFixedDecimal(subTotal);
            },
            allAdSubtotal: function(advertisementList) {
                var subTotal = 0.00;

                for (var ad of advertisementList) {
                    if (ad.qty >= 0 && ad.subTotal) {
                        subTotal += parseFloat(ad.subTotal);                        
                    }
                }
                return toFixedDecimal(subTotal);
            }
        };
    }]);

    return app;
}