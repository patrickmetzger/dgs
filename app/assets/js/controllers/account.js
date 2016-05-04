(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'UserService', 'CatService', 'AccountService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $location, $rootScope, User, searching, category, accountInfo) {

        $scope.title = 'My Account';

        $scope.activeProfile = User.getProfile().then(function(response){
			var dataResponse = response.data;
			$scope.profile = dataResponse;
			console.log($scope.profile);
		});


    }

    

})();

