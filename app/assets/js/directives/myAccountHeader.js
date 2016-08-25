(function() {
	'use strict';

	angular.module('dgs').directive("myAccountHeader", accountHeader);

	function accountHeader(){
		return {
	        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
	        templateUrl: "views/myaccount/myaccount_header.html"
	    }
	};

})();