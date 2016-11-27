'use strict';
module.exports = function(app) {
    app.factory('priceCalculator', [function() {
        var fixedDecimal = 2;

        function toFixedDecimal(value) {
            return parseFloat(value).toFixed(fixedDecimal);
        }

        function findPrivilegedPrice(ad, privilegedPrices) {
            for(var privilegedPrice of privilegedPrices) {
                if(privilegedPrice.advId == ad.id) {
                    return privilegedPrice;
                }
            }
            return null;
        }

        function calculateAdSubTotal(ad) {
            var privilegedPriceRules = ad.privilegedPrice;
            var subTotal = 0.00;

            if (privilegedPriceRules) {
                var exactQty = privilegedPriceRules.exactQty;
                var minimumAdv = privilegedPriceRules.minimumAdv;
                var privilegedPrice = privilegedPriceRules.price;
                
                if (exactQty) {
                    if(ad.qty >= minimumAdv) {
                        var privilegedPriceQty = parseInt(ad.qty / minimumAdv) * minimumAdv;
                        var standardPriceQty = ad.qty - privilegedPriceQty;

                        subTotal = privilegedPriceQty * privilegedPrice;

                        if(standardPriceQty > 0) {
                            subTotal += (standardPriceQty * ad.stdPrice);
                        }

                    } else {
                        subTotal = ad.qty * ad.stdPrice;
                    }
                } else {
                    if(ad.qty >= minimumAdv) {
                        subTotal = ad.qty * privilegedPrice;
                    } else {
                        subTotal = ad.qty * ad.stdPrice;
                    }
                }
            } else {
                subTotal = ad.qty * ad.stdPrice;
            }

            ad.subTotal = toFixedDecimal(subTotal);

            return ad.subTotal;
        }

        function sumAllSubTotal(advertisementList) {
            var subTotal = 0.00;

            for (var ad of advertisementList) {
                if (ad.qty >= 0 && ad.subTotal) {
                    subTotal += parseFloat(ad.subTotal);
                }
            }
            return toFixedDecimal(subTotal);
        }

        return {
            updateAdWithPrivilegedPrice: function(advertisementList, privilegedPrices) {
                for (var ad of advertisementList) {
                    var privilegedPrice = findPrivilegedPrice(ad, privilegedPrices);
                    if (privilegedPrice) {
                        ad.privilegedPrice = privilegedPrice;
                    } else {
                        ad.privilegedPrice = null;
                    }
                    calculateAdSubTotal(ad);
                }

                return advertisementList;
            }, 
            adSubTotal: function(ad) {
                return calculateAdSubTotal(ad);
            },
            allAdSubtotal: function(advertisementList) {
                return sumAllSubTotal(advertisementList);
            }
        };
    }]);

    return app;
}