(function() {
	'use strict';

	angular.module('dgs.sellerInfo', ['ItemService', 'Authentication', 'UserService', 'WishListService', 'ItemService']);

	angular.module('dgs.sellerInfo')
		.directive("sellerInfo", sellerInfo);

	function sellerInfo(item, User, items){
		return {
			restrict: 'E',
			
			templateUrl: 'views/directives/sellerInfo.html',
			
	  	};
	}

})();