(function() {
	'use strict';

	angular.module('dgs').directive("adminMenu", admin);

	function admin(){
		return {
	        restrict: 'EA', 
	        controller: function($scope, $timeout, $mdSidenav, $log){
	        	$scope.openLeftMenu = function() {
				    $mdSidenav('left').toggle();
				  };
	        },
	        templateUrl: "views/incs/admin_menu.html",
	    }
	};

})();