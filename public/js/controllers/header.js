(function () {
    'use strict';

    angular.module('Header', ['UserService', 'CatService']);
	
    angular
        .module('Header')
        .controller('header', header);


    function header($scope, $routeParams, catList) {
		catList.getDropDownList().then(function(cats){
			$scope.activeCatList = cats;
		});

	}

})();
