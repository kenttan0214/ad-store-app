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
            }
        };
    }]);

    return app;
}