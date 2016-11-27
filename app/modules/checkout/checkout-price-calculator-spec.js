describe('Test Price Calculator,', function() {
	var app = angular.module('kent.adstore.test', []);
	var priceCalculator = require('./checkout-price-calculator')(app);
	var mockPriceCalculator;
	
	beforeEach(angular.mock.module(app.name));

    beforeEach(function() {
        angular.mock.inject(function($injector) {
            mockPriceCalculator = $injector.get('priceCalculator');
        })
    });

    describe('Standard Price Ad,', function() {
		var mockAdList = [{"id":"classic","adName":"Classic Ad","stdPrice":269.99,"adPackages":[{"id":1,"adDesc":"most basic level of advertisement"}]},{"id":"standout","adName":"Standout Ad","stdPrice":322.99,"adPackages":[{"id":2,"adDesc":"allows to use a company logo"},{"id":3,"adDesc":"allow to use a longer presentation text"}]},{"id":"premium","adName":"Premium Ad","stdPrice":394.99,"adPackages":[{"id":5,"adDesc":"allows to use a company logo"},{"id":6,"adDesc":"allow to use a longer presentation text"},{"id":7,"adDesc":"puts the ad at the top of the results, allowing higher visibility"}]}];
    	
    	mockAdList[0].qty = 1; // classic
    	mockAdList[1].qty = 1; // standout
    	mockAdList[2].qty = 1; // premium
        
        it('1 x Classic Ad should be $269.99', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[0]);
            expect(parseFloat(subTotal)).toEqual(269.99);
        });

        it('1 x Standout Ad should be $322.99', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[1]);
            expect(parseFloat(subTotal)).toEqual(322.99);
        });

        it('1 x Premium Ad should be $394.99', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[2]);
            expect(parseFloat(subTotal)).toEqual(394.99);
        });

        it('Total expected be $987.97', function() {
        	var total = mockPriceCalculator.allAdSubtotal(mockAdList);
        	expect(parseFloat(total)).toEqual(987.97);
        });
    }); 

    describe('Customer: Unilever,', function() {
		var mockAdList = [{"id":"classic","adName":"Classic Ad","stdPrice":269.99,"adPackages":[{"id":1,"adDesc":"most basic level of advertisement"}]},{"id":"standout","adName":"Standout Ad","stdPrice":322.99,"adPackages":[{"id":2,"adDesc":"allows to use a company logo"},{"id":3,"adDesc":"allow to use a longer presentation text"}]},{"id":"premium","adName":"Premium Ad","stdPrice":394.99,"adPackages":[{"id":5,"adDesc":"allows to use a company logo"},{"id":6,"adDesc":"allow to use a longer presentation text"},{"id":7,"adDesc":"puts the ad at the top of the results, allowing higher visibility"}]}];
    	var privilegedPrice = [{"id":1,"customerId":1,"advId":"classic","minimumAdv":3,"exactQty":true,"privilegedDesc":"3 for 2 deal","price":179.993}];
    	
    	mockAdList[0].qty = 3; // classic
    	mockAdList[1].qty = 0; // standout
    	mockAdList[2].qty = 1; // premium
        
        it('ad list should be updated with privileged price', function() {
        	mockAdList = mockPriceCalculator.updateAdWithPrivilegedPrice(mockAdList, privilegedPrice);
            expect(mockAdList[0].privilegedPrice).toBeDefined();
        });
        
        it('3 x Classic Ad should be $539.98', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[0]);
            expect(parseFloat(subTotal)).toEqual(539.98);
        });

        it('0 x Standout Ad should be $0', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[1]);
            expect(parseFloat(subTotal)).toEqual(0);
        });

        it('1 x Premium Ad should be $394.99', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[2]);
            expect(parseFloat(subTotal)).toEqual(394.99);
        });

        it('Total expected be $934.97', function() {
        	var total = mockPriceCalculator.allAdSubtotal(mockAdList);
        	expect(parseFloat(total)).toEqual(934.97);
        });
    });    

    describe('Customer: Apple,', function() {
		var mockAdList = [{"id":"classic","adName":"Classic Ad","stdPrice":269.99,"adPackages":[{"id":1,"adDesc":"most basic level of advertisement"}]},{"id":"standout","adName":"Standout Ad","stdPrice":322.99,"adPackages":[{"id":2,"adDesc":"allows to use a company logo"},{"id":3,"adDesc":"allow to use a longer presentation text"}]},{"id":"premium","adName":"Premium Ad","stdPrice":394.99,"adPackages":[{"id":5,"adDesc":"allows to use a company logo"},{"id":6,"adDesc":"allow to use a longer presentation text"},{"id":7,"adDesc":"puts the ad at the top of the results, allowing higher visibility"}]}];
    	var privilegedPrice = [{"id":2,"customerId":2,"advId":"standout","minimumAdv":1,"exactQty":false,"privilegedDesc":"discount price $299.99 per ad","price":299.99}];
    	
    	mockAdList[0].qty = 0; // classic
    	mockAdList[1].qty = 3; // standout
    	mockAdList[2].qty = 1; // premium
        
        it('ad list should be updated with privileged price', function() {
        	mockAdList = mockPriceCalculator.updateAdWithPrivilegedPrice(mockAdList, privilegedPrice);
            expect(mockAdList[2].privilegedPrice).toBeDefined();
        });
        
        it('0 x Classic Ad should be $0', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[0]);
            expect(parseFloat(subTotal)).toEqual(0);
        });

        it('3 x Standout Ad should be $899.97', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[1]);
            expect(parseFloat(subTotal)).toEqual(899.97);
        });

        it('1 x Premium Ad should be $394.99', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[2]);
            expect(parseFloat(subTotal)).toEqual(394.99);
        });

        it('Total expected be $1294.96', function() {
        	var total = mockPriceCalculator.allAdSubtotal(mockAdList);
        	expect(parseFloat(total)).toEqual(1294.96);
        });
    }); 
    
    describe('Customer: Nike,', function() {
		var mockAdList = [{"id":"classic","adName":"Classic Ad","stdPrice":269.99,"adPackages":[{"id":1,"adDesc":"most basic level of advertisement"}]},{"id":"standout","adName":"Standout Ad","stdPrice":322.99,"adPackages":[{"id":2,"adDesc":"allows to use a company logo"},{"id":3,"adDesc":"allow to use a longer presentation text"}]},{"id":"premium","adName":"Premium Ad","stdPrice":394.99,"adPackages":[{"id":5,"adDesc":"allows to use a company logo"},{"id":6,"adDesc":"allow to use a longer presentation text"},{"id":7,"adDesc":"puts the ad at the top of the results, allowing higher visibility"}]}];
    	var privilegedPrice = [{"id":3,"customerId":3,"advId":"premium","minimumAdv":4,"exactQty":false,"privilegedDesc":"$379.99 per ad when 4 or more are purchased","price":379.99}];
    	
    	mockAdList[0].qty = 0; // classic
    	mockAdList[1].qty = 0; // standout
    	mockAdList[2].qty = 4; // premium
        
        it('ad list should be updated with privileged price', function() {
        	mockAdList = mockPriceCalculator.updateAdWithPrivilegedPrice(mockAdList, privilegedPrice);
            expect(mockAdList[2].privilegedPrice).toBeDefined();
        });
        
        it('0 x Classic Ad should be $0', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[0]);
            expect(parseFloat(subTotal)).toEqual(0);
        });

        it('0 x Standout Ad should be $0', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[1]);
            expect(parseFloat(subTotal)).toEqual(0);
        });

        it('4 x Premium Ad should be $1519.96', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[2]);
            expect(parseFloat(subTotal)).toEqual(1519.96);
        });

        it('Total expected be $1519.96', function() {
        	var total = mockPriceCalculator.allAdSubtotal(mockAdList);
        	expect(parseFloat(total)).toEqual(1519.96);
        });
    });

    describe('Customer: Ford,', function() {
		var mockAdList = [{"id":"classic","adName":"Classic Ad","stdPrice":269.99,"adPackages":[{"id":1,"adDesc":"most basic level of advertisement"}]},{"id":"standout","adName":"Standout Ad","stdPrice":322.99,"adPackages":[{"id":2,"adDesc":"allows to use a company logo"},{"id":3,"adDesc":"allow to use a longer presentation text"}]},{"id":"premium","adName":"Premium Ad","stdPrice":394.99,"adPackages":[{"id":5,"adDesc":"allows to use a company logo"},{"id":6,"adDesc":"allow to use a longer presentation text"},{"id":7,"adDesc":"puts the ad at the top of the results, allowing higher visibility"}]}];
    	var privilegedPrice = [{"id":4,"customerId":4,"advId":"classic","minimumAdv":5,"exactQty":true,"privilegedDesc":"5 for 4 deal","price":215.992},{"id":5,"customerId":4,"advId":"standout","minimumAdv":1,"exactQty":false,"privilegedDesc":"discount price $309.99 per ad","price":309.99},{"id":6,"customerId":4,"advId":"premium","minimumAdv":3,"exactQty":false,"privilegedDesc":"$389.99 per ad when 3 or more are purchased","price":389.99}];
    	
    	mockAdList[0].qty = 6; // classic
    	mockAdList[1].qty = 2; // standout
    	mockAdList[2].qty = 3; // premium
        
        it('ad list should be updated with privileged price', function() {
        	mockAdList = mockPriceCalculator.updateAdWithPrivilegedPrice(mockAdList, privilegedPrice);
            expect(mockAdList[0].privilegedPrice).toBeDefined();
            expect(mockAdList[1].privilegedPrice).toBeDefined();
            expect(mockAdList[2].privilegedPrice).toBeDefined();
        });
        
        it('6 x Classic Ad should be $1349.95', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[0]);
            expect(parseFloat(subTotal)).toEqual(1349.95);
        });

        it('2 x Standout Ad should be $619.98', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[1]);
            expect(parseFloat(subTotal)).toEqual(619.98);
        });

        it('3 x Premium Ad should be $1169.97', function() {
        	var subTotal = mockPriceCalculator.adSubTotal(mockAdList[2]);
            expect(parseFloat(subTotal)).toEqual(1169.97);
        });

        it('Total expected be $3139.90', function() {
        	var total = mockPriceCalculator.allAdSubtotal(mockAdList);
        	expect(parseFloat(total)).toEqual(3139.90);
        });
    });      
})