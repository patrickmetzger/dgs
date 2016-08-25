(function() {
	'use strict';

	angular.module('dgs').directive("header", header);

	function header(){
		return {
	        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
	        templateUrl: "views/incs/header.html",
	        controller: "header"
	    }
	};

})();