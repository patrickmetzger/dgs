(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'CatService', 'AccountService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $location, $rootScope, searching, category) {
       
        $scope.title = 'My Account';


    }

    

})();

