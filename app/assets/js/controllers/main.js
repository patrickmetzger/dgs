(function () {
    'use strict';

    angular.module('Main', ['UserService']);

    angular.module('Main').controller('main', main);
    function main($scope, $http, $location, $state, $stateParams, $rootScope, User) {
		$scope.$watch(User.checkLogin, function (value, oldValue) {
		    if(!value && oldValue) {
		      console.log("Disconnect");
		      $state.go('login');
		    }
		}, true);

    }

    

})();

