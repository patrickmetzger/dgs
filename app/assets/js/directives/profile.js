(function() {
	'use strict';

	angular.module('dgs.profile', ['UserService', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

	angular.module('dgs.profile')
		.directive("userProfile", userProfile);

	function userProfile(){
		return {
			restrict: 'AE',
			controller: 'ProfileCtrl',
			templateUrl: 'views/myaccount/profile.directive.html',
	  	};
	}


	angular.module('dgs.profile')
		.directive("itemsSelling", selling);

	function selling(){
		return {
			restrict: 'AE',
			controller: 'ItemsCtrl',
			templateUrl: 'views/myaccount/items_selling.html',
	  	};
	}

})();