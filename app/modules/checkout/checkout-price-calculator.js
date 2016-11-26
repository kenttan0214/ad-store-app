'use strict';
module.exports = function(app) {
    app.factory('priceCalculator', [function() {
        return {
            adSubTotal: function(ad, privilegedPrice) {
                var subtotal = 0;
                if (privilegedPrice) {

                } else {
                    subtotal = ad.stdPrice * ad.qty;
                }
                return subtotal;
            },
            allAdSubtotal: function(advertisementList) {
                var subTotal = 0;

                for (var ad of advertisementList) {
                    if (ad.qty >= 0 && ad.subTotal >=0) {
                        subTotal += ad.subTotal;
                    }
                }

                return subTotal;
            }
        };
    }]);

    return app;
}