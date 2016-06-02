(function () {
    'use strict';

    angular.module('SearchService', ['CatService']);

    angular
        .module('SearchService')
        .service('searching', searching);
    
    function searching($http, catList, $sce) {
        return {
            getData : function(category, keyword) {
            },

            GetCatById : function ($category, $keyword) {
                $scope.test = 'testing';
            },

            getCatData : function ($category, $keyword) {
                $scope.currentPage = 1;
                $scope.pageSize = 10;

                $scope.catName = '';
                $scope.catID = '';
                $scope.searchKeyword = $keyword;

                CatService.GetCatById($category).then(function(d) {
                    if (d != ''){
                        $scope.catTitle = d[0]['name'][0]['value'];
                    }
                });

                CatService.GetProductByCat($category).then(function(d) {
                    if (d != ''){
                        $scope.searchResults = d;
                    }else{
                        $scope.searchResults = '';
                    }
                });
            }

        };
        

        
        function searchAllCatResults($catID, $keyword) {

            var promise = $http.get('http://api.dgs.local/item/' + $catID).then(function (response) {
                var searchItems = [];
                var catID = 0;
                
                $scope.searchData =  response['data'];
                $scope.searchKeyword = $keyword;

                if ($keyword != '' || $catID > 0){
                    if ($scope.searchData.length > 0){
                        for (var i = 0; i < $scope.searchData.length; i++){
                            var thumb = response['data'][0]['field_image'][0]['url'];
                            var title = response['data'][i]['title'][0]['value'];
                            var nid = response['data'][i]['nid'][0]['value'];
                            console.log(thumb);
                            searchItems.push({'title': title, 'id':nid, 'thumb':thumb});
                        }
                        $scope.searchCount =  $scope.searchData.length + ' items found';
                        $scope.searchList = searchItems;  
                    }else{
                        $scope.searchCount = '0 items found';
                        $scope.searchList = [];
                    }

                }else{
                    $scope.searchCount = '0 items found';
                    $scope.searchList = [];
                }
                
                
            }, function (response) {
                $scope.searchCount = '0 items found';
                $scope.searchList = [];
            });
        };

    };
 
})();
