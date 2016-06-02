(function() {
	'use strict';

	angular.module('dgs.searchform', ['SearchService']);

	angular.module('dgs.searchform')
		.directive("searchForm", searchFrm);

	function searchFrm(){
		return {
			restrict: 'AE',
			require: '?ngModel',
			controller: 'search',	        
			templateUrl: 'views/directives/searchForm.html',
			link: function(scope, element, attrs, ngModel){
			}
	  	};
	}

})();