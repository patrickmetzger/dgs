(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'UserService', 'CatService', 'AccountService', 'ItemService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $state, $stateParams, $location, $rootScope, User, category, accountInfo) {
    	checkSecurity($state, User);
        $scope.title = 'My Account';

    }

    angular.module('Account').controller('ItemAddEdit', itemAddEdit);
    function itemAddEdit($scope, $http, $state, $stateParams, $location, $rootScope, User, category, accountInfo, item) {
    	checkSecurity($state, User);
        var iID = $stateParams.itemID;
        item.getItemByID(iID).then(function(response){
        	$scope.itemData = response.data;
        });

    }

    

})();

