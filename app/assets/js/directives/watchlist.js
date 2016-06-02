(function() {
	'use strict';

	angular.module('dgs.watchlist', ['UserService']);

	angular.module('dgs.watchlist')
		.directive("watchList", watchList);

	function watchList(User){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs) {
				var uID = User.getUserId();
				$scope.watchList = User.getWatchList(uID);
			},
	        
			templateUrl: 'views/directives/watchlist.html',
	  	};
	}

})();