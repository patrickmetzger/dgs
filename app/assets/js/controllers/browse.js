(function () {
    'use strict';

    angular.module('Browse', ['SearchService', 'CatService', 'ItemService']);

    angular.module('Browse').controller('browse', browse);
    function browse($scope, $http, $location, $rootScope, category, catList) {


    	catList.getActiveList().then(function(cats){
			$scope.allCats = cats;
		});



    }

    angular.module('Browse').controller('browseItems', browseitems);
    function browseitems($scope, $http, $location, $rootScope, category, catList, items, $routeParams) {

        category.getData($routeParams.catType).then(function(catData){
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

        $scope.category = $routeParams.category;
        $scope.keyword = $routeParams.keyword;
        if ($scope.keyword != ''){
            $scope.filters["name"] = $scope.keyword;
        }

        return undefined;
    }

    

})();
