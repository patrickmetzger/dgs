(function () {
    'use strict';

    angular.module('Browse', ['SearchService', 'CatService']);

    angular.module('Browse').controller('browse', browse);
    function browse($scope, $http, $location, $rootScope, searching, category, catList) {

    	catList.getActiveList().then(function(cats){
			$scope.allCats = cats;
		});

        $scope.searching = function(){
            $location.path('/search?category=' + $scope.category + '&keyword=' + $scope.keyword);
            searching.getData($scope.category, $scope.keyword);
            
        }



    }

    

})();
