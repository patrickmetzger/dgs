(function() {
	'use strict';

	angular.module('dgs.profile', ['UserService']);

	angular.module('dgs.profile')
		.directive("userProfile", userProfile);

	function userProfile(User){
		
		var activeUserProfile = User.getProfile().then(function(response){
			var dataResponse = response.data;
			var profile = dataResponse;
		});

		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs) {
				User.getProfile().then(function(response){
					var dataResponse = response.data;
					$scope.profile = dataResponse;
				});
			},
	        
			templateUrl: 'views/myaccount/profile.directive.html',
	  	};
	}

})();