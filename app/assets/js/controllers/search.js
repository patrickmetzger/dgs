(function () {
    'use strict';

    angular.module('Search', ['SearchService', 'CatService']);

    angular.module('Search').controller('search', search);
    function search($scope, $http, $location, $rootScope, searching, category) {
       
        $scope.searching = function(){
            $location.path('/search?category=' + $scope.category + '&keyword=' + $scope.keyword);
            searching.getData($scope.category, $scope.keyword);
            
        }



    }

    

})();

