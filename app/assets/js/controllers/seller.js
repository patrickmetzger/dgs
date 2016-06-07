(function () {
    'use strict';

    angular.module('Seller', ['UserService', 'ItemService']);

    angular.module('Seller').controller('seller', seller);
    function seller($scope, $location, $rootScope, $routeParams, User, item) {
        $scope.testing = 'testing';
        // get Item data
    	User.getUserByID($routeParams.id).then(function(response){    

        }, function(response) {
        
        });

    }   

})();
