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
(function () {
    'use strict';

    angular.module('dgs.authService', []);
  
    angular
        .module('dgs.authService')
        .service('AuthService', auth);

        function auth($q, $cookies, $http, userRoles){
          var username = '';
          var isAuthenticated = false;
          var role = '';
          var authToken;
         
          function loadUserCredentials() {
            var token = $cookies.get('token');
            if (token) {
              useCredentials(token);
            }
          }
         
          function storeUserCredentials(token) {
            useCredentials(token);
          }
         
          function useCredentials(token) {
            username = token.split('.')[0];
            isAuthenticated = true;
            authToken = token;
         
            if (username == 'admin') {
              role = userRoles.admin
            }
            if (username == 'user') {
              role = userRoles.user
            }
         
            // Set the token as header for your requests!
            $http.defaults.headers.common['X-Auth-Token'] = token;
          }
         
          function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            $cookies.delete('token');
          }
         
          var login = function(name, pw) {
            return $q(function(resolve, reject) {
              if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
                // Make a request and receive your auth token from your server
                storeUserCredentials(name + '.yourServerToken');
                resolve('Login success.');
              } else {
                reject('Login Failed.');
              }
            });
          };
         
          var logout = function() {
            destroyUserCredentials();
          };
         
          var isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
              authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
          };
         
          loadUserCredentials();
         
          return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function() {
              console.log('is authenticated');
              return isAuthenticated;
            },
            username: function() {
              return username;
            },
            role: function() {
              return role;
            }
          };
        }

    angular
      .module('dgs.authService').factory('AuthInterceptor', 
        function ($rootScope, $q, authEvents) {
        return {
          responseError: function (response) {
            $rootScope.$broadcast({
              401: authEvents.notAuthenticated,
              403: authEvents.notAuthorized
            }[response.status], response);
            return $q.reject(response);
          }
        }
      });


    angular.module('dgs.authService').config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

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

	        getData : function(category) {
	        	return $http.get('/api/cats/' + category);
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
							activeCats[i] = cat.data[i];
						}
					}
					return activeCats;
				});
	    	}
		}
	}

})();
// public/js/services/itemService.js
(function () {
    'use strict';

    angular.module('ItemService', []);
	
    angular
        .module('ItemService')
        .factory('items', items);

	function items($http) {

		var itemsByID = function(id){
			return $http.get('/api/items/user/' + id);
		};

		var itemsByCat = function(catID){
			return $http.get('/api/items/' + catID);
		};

		var itemCountByID = function(id){
			var items = $http.get('/api/items/user/' + id).then(function(response){
				return response.data;
			});
			
			return items;
		};

		return {

			getItemsByCat : function(catID) {
	            return itemsByCat(catID);
	        },

	        getItemsByID : function(id) {
	            return itemsByID(id);
	        },

	        getItemCountByID : function(id) {
	            return itemCountByID(id);
	        }
		}
		
	}

	angular
        .module('ItemService')
        .factory('item', item);

	function item($http) {
		
		var itemByID = function(id){
			return $http.get('/api/item/' + id);
		}

		return {
			getItemByID: function(itemID) {
				// we need to get the number first.
			    return itemByID(itemID);
		    }
		}
		
	}

	angular
        .module('ItemService')
        .factory('countItem', count);
	function count() {
		return {
			add: function(itemID) {
				// we need to get the number first.
			    //console.log(itemID);
		    },
		    get: function(stateName) {
		      //console.log(stateName);
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

angular.module('dgs').factory('AuthServiceOLD',
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

    
    function user($rootScope, $http, $cookies, $location, $route, $q, userRoles) {
        
        var loginState = false;

        var userById = function(id){
            return $http.get('/api/user/id/' + id);
        };

        var checkFollow = function(id){
            var userData = returnUserID();
            if (userData){
                
                return $http.get('/api/user/follow/' + userData.token + '/' + id).then(function(response){
                    var followingData = response.data;
                    return followingData;
                });
            }else{
                return undefined;   
            }
            return checkFollow;
        };

        var getBearToken = function(){
            var beartoken = $cookies.get("token");
            return beartoken;
        };

        var checkBearerToken = function(ref, action){
            var activeSession = $cookies.get("token");
            if (activeSession){
                loginState = true;
            }else{
                // lets redirect to the login page with a redirect back to page.
                if (action != ''){
                    $location.path('/login').search({'ref': ref, 'action': action});    
                }else{
                    $location.path('/login').search('ref', ref);
                }
            }
            return loginState;
        };

        var activeUserProfile = function(){
            if (UserObject.email){
                return buildUser();
            }else{
                return UserObject;
            }
       }

        var getUID = function(){
            if (checkBearerToken()){
                return $http.get('/api/userid');
            }else{
                return undefined;
            }
            
        }

        var returnUserID = function(){
            
            
        }

        var logout = function(){

            $cookies.remove("token");

            $rootScope.showMenu = false;
            $rootScope.$broadcast('loginStateChange');

            $location.path('/login');
            $route.reload();
        };

        var followUser = function(itemID, action){
            var userData = returnUserID();
            if (userData){
                // add to users wishlist
                var data = {
                    'userID' : userData.token,
                    'itemID' : itemID,
                    'action' : action
                };

                $http.post('/api/user/follow', data).then(function(success){
                    return success;
                });
            }
        };

        var buildUser = function(){
            // get user id to build user
            var userID = $http.get('/api/userid');

            var userData = userID.then(function(response){
                userById(response.data).then(function(userData){
                    return userData.data;
                });
            });


            return userData;

        }

        return {

            createUser : function(){
                return buildUser();
            },

            getUserByID : function(id){
                return userById(id);
            },

            getWatchList : function(uID){
                return userWatchList(uID);
            },

            getUserId : function(){
                return getUID();
            },

            getToken: function(){
                return getBearToken();
            },

            checkAccessToken: function(ref, action){
                return checkBearerToken(ref, action);
            },

            // call to get all users
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
                if ($cookies.get("token")){
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
            },

            checkIfFollow: function(userID){
                return checkFollow(userID);
            },

            follow: function(id, action){
                return followUser(id, action);
            }
            
        }       

    };
(function () {
    'use strict';

    angular.module('UtilService', []);
	
    angular
        .module('UtilService')
        .factory('Util', UtilService);

	function UtilService() {
		var Util = {
	    /**
	     * Return a callback or noop function
	     *
	     * @param  {Function|*} cb - a 'potential' function
	     * @return {Function}
	     */
	    safeCb(cb) {
	      return angular.isFunction(cb) ? cb : angular.noop;
	    },

	    /**
	     * Parse a given url with the use of an anchor element
	     *
	     * @param  {String} url - the url to parse
	     * @return {Object}     - the parsed url, anchor element
	     */
	    urlParse(url) {
	      var a = document.createElement('a');
	      a.href = url;

	      // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
	      if (a.host === '') {
	        a.href = a.href;
	      }

	      return a;
	    },

	    /**
	     * Test whether or not a given url is same origin
	     *
	     * @param  {String}           url       - url to test
	     * @param  {String|String[]}  [origins] - additional origins to test against
	     * @return {Boolean}                    - true if url is same origin
	     */
	    isSameOrigin(url, origins) {
	      url = Util.urlParse(url);
	      origins = origins && [].concat(origins) || [];
	      origins = origins.map(Util.urlParse);
	      origins.push($window.location);
	      origins = origins.filter(function(o) {
	        let hostnameCheck = url.hostname === o.hostname;
	        let protocolCheck = url.protocol === o.protocol;
	        // 2nd part of the special treatment for IE fix (see above):
	        // This part is when using well-known ports 80 or 443 with IE,
	        // when $window.location.port==='' instead of the real port number.
	        // Probably the same cause as this IE bug: https://goo.gl/J9hRta
	        let portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port ===
	          '443');
	        return hostnameCheck && protocolCheck && portCheck;
	      });
	      return origins.length >= 1;
	    }
	  };

	  return Util;
		
	}

})();
// public/js/services/itemService.js
(function () {
    'use strict';

    angular.module('WishListService', ['UserService']);
	
    angular.module('WishListService').factory('wList', wishlist);
	function wishlist($http, User) {

		var deletingItem = function(itemID, action){
			var userData = User.getUserId();
			if (userData){
				// add to users wishlist
				var data = {
	                'userID' : userData.token,
	                'itemID' : itemID,
	                'action' : action
	            };
	            
	            return $http.post('/api/user/wishlist', data);
			}
		}

		var addingItem = function(itemID, action){
			var userData = User.getUserId();
			if (userData){
				// add to users wishlist
				var data = {
	                'userID' : userData.token,
	                'itemID' : itemID,
	                'action' : action
	            };

	            return $http.post('/api/user/wishlist', data);
			}
		}
		
		var inWishList = function(itemID){
            var userData = User.getUserId();
            var inWL = false;

            if (userData){
            	var userID = userData.token;
            	return $http.get('/api/user/wishlist/' + userID + '/' + itemID);
            }else{
            	return undefined;
            }

        };

		return {
			adding: function(itemID, action){
				return addingItem(itemID, action);
			},
			checkWishList : function(itemID) {                
                return inWishList(itemID);
            },
            removing: function(itemID, action){
            	return deletingItem(itemID, action);	
            }
		}

		
	}

})();