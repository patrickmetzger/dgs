(function() {
	'use strict';

	angular.module('dgs').directive("header", header);

	function header(){
		return{
			templateUrl: '/incs/header.html'
		}
	};

})();