(function () {
    'use strict';

    angular.module('Item', ['SearchService', 'CatService', 'ItemService']);

    angular.module('Item').controller('item', item);
    function item($scope, $http, $location, $rootScope, $routeParams, searching, category, item) {
        // get Item data
    	item.getItemByID($routeParams.itemID).then(function(response){
            $scope.itemData = response.data;
            $scope.status = response.status;
        }, function(response) {
            $scope.itemData = "Request failed";
            $scope.status = response.status;
        });
    }   

})();
