(function () {
    'use strict';

    angular.module('Browse', ['UserService', 'SearchService', 'CatService', 'ItemService', 'ngMaterial']);

    angular.module('Browse').controller('browse', browse);
    function browse($scope, $http, $location, $rootScope, category, catList) {
    	catList.getActiveList().then(function(cats){
			$scope.allCats = cats;
		});
    }

    angular.module('Browse').controller('browseItems', browseitems);
    function browseitems($state, User, $scope, $http, $location, $rootScope, category, catList, items, $stateParams) {
        $scope.sortData = {
            availableOptions: [
              {sort: "'-price'", value: "Price: Highest to Lowest"},
              {sort: "'price'", value: "Price: Lowest to Highest"},
              {sort: "'-insertDate'", value: "Date: Newsest to Oldest"},
              {sort: "'insertDate'", value: "Date: Oldest to Newest"}
            ],
            selectedOption: {sort: "'-price'", value: "Price: Highest to Lowest"}
        };

        category.getData($stateParams.catType).then(function(catData){
            if (catData.data && catData.data._id != ''){
                var catID = catData.data._id;
                $scope.catName = catData.data.name;
                $scope.items = '';
                // Get all items based on catID
                items.getItemsByCat(catID).then(function(items){
                    if (items.data.length > 0){
                        $scope.items = items.data;
                    }
                });
            }
        });

        $scope.filters = {};
        $scope.sort = 'price';

        $scope.category = $stateParams.category;
        $scope.keyword = $stateParams.keyword;
        if ($scope.keyword != ''){
            $scope.filters["name"] = $scope.keyword;
        }

        return undefined;
    }

})();
