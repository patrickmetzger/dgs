(function () {
    'use strict';

    angular.module('Search', ['SearchService', 'CatService']);

    angular.module('Search').controller('search', search);
    function search($scope, $http, $location, $rootScope, $route, $routeParams, searching, category, catList) {
        $scope.category = $routeParams.category;
        $scope.keyword = $routeParams.keyword;

        if($location.$$search.keyword){
            $scope.keyword = $location.$$search.keyword;            
        }

        // get category list
        catList.getActiveList().then(function(cats){
            $scope.activeCatList = cats;
        });

        $scope.searching = function(){
            if ($scope.keyword != ''){
                $location.path('/browse-items/' + $scope.category).search('keyword', $scope.keyword);    
            }else{
                $location.path('/browse-items/' + $scope.category).search({});
            }            
        }
    }

})();

