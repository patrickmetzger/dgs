// public/js/controllers/register.js
(function () {
    'use strict';

    angular.module('MyAccount_Tab', ['UserService']);
	
    angular
        .module('MyAccount_Tab')
        .controller('tab', tab);

	function tab($scope, $state, $stateParams) {
		$scope.profile = false;
		$scope.items = false;
		$scope.watchlist = false;

		if ($stateParams.tab === 'profile'){
			$scope.profile = true;		
		}
		else if ($stateParams.tab === 'items'){
			$scope.items = true;		
		}else if ($stateParams.tab === 'watchlist'){
			$scope.watchlist = true;		
		}

	};

})();