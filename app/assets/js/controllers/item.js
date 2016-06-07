(function () {
    'use strict';

    angular.module('Item', ['SearchService', 'CatService', 'ItemService']);

    angular.module('Item').controller('item', item);
    function item($scope, $http, $location, $rootScope, $routeParams, searching, category, item, items) {
        // get Item data
    	item.getItemByID($routeParams.itemID).then(function(response){
            $scope.itemData = response.data;
            $scope.status = response.status;

            $scope.sellerID = $scope.itemData.sellerID;

            // Get Seller Information
            items.getItemsByID($scope.sellerID).then(function(response){
                $scope.sItems = response.data;
            },function(response){

            });

        }, function(response) {
            $scope.itemData = "Request failed";
            $scope.status = response.status;
        });
    }   

})();
