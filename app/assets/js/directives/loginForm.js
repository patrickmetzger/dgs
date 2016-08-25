(function() {
	'use strict';

	angular.module('dgs.loginFrm', ['AuthControllers', 'UserService']);

	angular.module('dgs.loginFrm').directive("loginForm", login);

	function login(User){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs, $location, $routeParams) {

			},
	        
			templateUrl: 'views/directives/loginForm.html',
	  	};
	}

})();