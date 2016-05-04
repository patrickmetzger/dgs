// public/js/services/account.js
(function () {
    'use strict';

    angular.module('AccountService', ['UserService']);
	
    angular
        .module('AccountService')
        .factory('accountInfo', accountInfo);

	function accountInfo($http, $location, User) {
		//checkSecurity($location, user);

		return {
			userProfile: function(){
				
			}

		};
		
	}

})();
// public/js/services/category.js
(function () {
    'use strict';

    angular.module('CatService', []);
	
    angular
        .module('CatService')
        .factory('category', category);

	function category($http) {
		return {
			get : function() {
	            return $http.get('/api/cats');
	        },

	        getData : function(category, keyword) {

	        }
		}
		
	}


    angular
        .module('CatService')
        .factory('catList', catList);

	function catList($http, category) {
		return {
			getActiveList : function() {    			
	    		return category.get().then(function(cat){
	    			var activeCats = [];
					for (var i = 0; i < cat.data.length; i++){
						if (cat.data[i].active){
							activeCats[i] = ({'id':cat.data[i]._id, 'name':cat.data[i].name});
						}
					}
					return activeCats;
				});
	    	}
		}
	}

})();
// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }       

}]);
(function () {
    'use strict';

    angular.module('SearchService', ['CatService']);

    angular
        .module('SearchService')
        .service('searching', searching);
    
    function searching($http, catList, $sce) {
        return {
            getData : function(category, keyword) {
                console.log(category);
            },

            GetCatById : function ($category, $keyword) {
                $scope.test = 'testing';
                console.log($scope.test);
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

angular.module('dgs').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/users',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

}]);
// public/js/services/UserService.js

angular.module('UserService', [
    'ngCookies'
]);

angular.module('UserService')
    .factory('User', user);

    function user($rootScope, $http, $cookies, $location, $route) {

        var loginState = false;

        var checkBearerToken = function(){
            var activeSession = $cookies.getObject("dgsUserAuth");
            if (activeSession){
                loginState = true;
                return true;
            }
        };

        var activeUserProfile = function(){
            if (checkBearerToken()){
                var activeSession = $cookies.getObject("dgsUserAuth");
                return $http.get('/api/user/' + activeSession.token);
            }
        }

        var logout = function(){
            if ($cookies.getObject("dgsUserAuth")){
                $cookies.remove("dgsUserAuth");
            }
            
            $rootScope.showMenu = false;
            $rootScope.$broadcast('loginStateChange');

            $location.path('/login');
            $route.reload();
        };

        return {

            checkAccessToken: function(){
                return checkBearerToken();
            },

            // call to get all nerds
            get : function() {
                return $http.get('/api/user');
            },

            checkEmail : function(email) {
                return $http.get('/api/users/' + email);
            },

            // these will work when more API routes are defined on the Node side of things
            // call to POST and create a new nerd
            create : function(usersData) {
                return $http.post('/api/user', usersData);
            },

            // call to DELETE a nerd
            delete : function(id) {
                return $http.delete('/api/user/' + id);
            },

            authenticate : function(loginData){
                return $http.post('/api/authenticate', loginData);
            },

            checkLogin: function() {
                if ($cookies.getObject("dgsUserAuth")){
                    loginState = true;
                }else{
                    loginState = false;
                };
                return loginState;
            },

            doLogout: function($scope){
                return function() {
                    logout($scope);
                };
            },

            getProfile: function(){
                return activeUserProfile();
            }
        }       

    };