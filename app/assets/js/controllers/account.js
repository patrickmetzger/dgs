(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'UserService', 'CatService', 'AccountService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $location, $rootScope, User, category, accountInfo) {

        $scope.title = 'My Account';


    }

    

})();

