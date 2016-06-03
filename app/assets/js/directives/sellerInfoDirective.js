(function() {
	'use strict';

	angular.module('dgs.sellerInfo', ['ItemService', 'Authentication', 'UserService', 'WishListService']);

	angular.module('dgs.sellerInfo')
		.directive("sellerInfo", sellerInfo);

	function sellerInfo(item, User){
		return {
			restrict: 'AE',
			scope: {
				test: "=testing",
				sellerID: "=sellerID"
			},
			templateUrl: 'views/directives/sellerInfo.html',
			link: function(scope, element, attrs){
				console.log(attrs.test);
			},
			controller: function($scope) {
			}
	  	};
	}

})();