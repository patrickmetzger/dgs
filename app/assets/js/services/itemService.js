// public/js/services/itemService.js
(function () {
    'use strict';

    angular.module('ItemService', []);
	
    angular
        .module('ItemService')
        .factory('items', items);
	function items($http) {

		var itemsByCat = function(catID){
			return $http.get('/api/items/' + catID);
		};

		return {
			getItemsByCat : function(catID) {
	            return itemsByCat(catID);
	        }
		}
		
	}

	angular
        .module('ItemService')
        .factory('item', item);

	function item($http) {
		
		var itemByID = function(id){
			return $http.get('/api/item/' + id);
		}

		return {
			getItemByID: function(itemID) {
				// we need to get the number first.
			    return itemByID(itemID);
		    }
		}
		
	}

	angular
        .module('ItemService')
        .factory('countItem', count);
	function count() {
		return {
			add: function(itemID) {
				// we need to get the number first.
			    //console.log(itemID);
		    },
		    get: function(stateName) {
		      //console.log(stateName);
		    }
		}
		
	}

})();