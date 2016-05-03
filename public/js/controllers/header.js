(function () {
    'use strict';

    angular.module('Header', ['UserService', 'CatService']);
	
    angular
        .module('Header')
        .controller('header', header);
    function header($scope, $rootScope, $location, $routeParams, User, catList, $route) {
		
        // get category list
        catList.getActiveList().then(function(cats){
			$scope.activeCatList = cats;
		});

        $scope.route = $route;
        
        $scope.isLoggedIn = User.checkLogin();
        $scope.menuLogoutClick = User.doLogout($scope);

        $rootScope.$on('loginStateChange', function(){
          console.log($scope.showMenu);
        });

	}

})();
