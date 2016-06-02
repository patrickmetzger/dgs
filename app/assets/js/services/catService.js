// public/js/services/category.js
(function () {
    'use strict';

    angular.module('CatService', []);
	
    angular
        .module('CatService')
        .factory('category', category);

	function category($http) {
		return {
			get : function() {
	            return $http.get('/api/cats');
	        },

	        getData : function(category) {
	        	return $http.get('/api/cat/' + category);
	        }
		}
		
	}


    angular
        .module('CatService')
        .factory('catList', catList);

	function catList($http, category) {
		return {
			getActiveList : function() {    			
	    		return category.get().then(function(cat){
	    			var activeCats = [];
					for (var i = 0; i < cat.data.length; i++){
						if (cat.data[i].active){
							activeCats[i] = cat.data[i];
						}
					}
					return activeCats;
				});
	    	}
		}
	}

})();