(function () {
    'use strict';

    angular.module('Header', ['UserService', 'CatService']);
	
    angular
        .module('Header')
        .controller('header', header);
    function header($scope, $rootScope, $location, $stateParams, User, catList, $state) {
		$scope.state = $state;
        
        $scope.isLoggedIn = User.checkLogin();
        $scope.menuLogoutClick = User.doLogout($scope);
        $rootScope.$on('loginStateChange', function(){
        });
        // get category list
        catList.getActiveList().then(function(cats){
            $scope.activeCatList = cats;
        });

	}

})();
