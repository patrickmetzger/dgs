(function () {
    'use strict';

    angular.module('Main', ['UserService']);

    angular.module('Main').controller('main', main);
    function main($scope, $http, $state, $stateParams, $rootScope, User) {
    	$scope.$state = $state;
		$scope.$watch(User.checkLogin, function (value, oldValue) {
		    if(!value && oldValue) {
		      $state.go('login');
		    }
		}, true);
    }

    

})();

