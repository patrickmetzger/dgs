(function () {
    'use strict';

    angular.module('Item', ['SearchService', 'CatService', 'ItemService', 'UserService']);

    angular.module('Item').controller('item', item);
    function item($scope, $http, $location, $rootScope, $stateParams, searching, category, User, item, items) {

        // get Item data
    	item.getItemByID($stateParams.itemID).then(function(response){
            $scope.itemData = response.data;
            $scope.status = response.status;

            $scope.sellerID = $scope.itemData.sellerID;

        }, function(response) {
            $scope.itemData = "Request failed";
            $scope.status = response.status;
        });
    }   

})();
