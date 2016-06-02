// public/js/app.js
angular.module('dgs', [
	'ngRoute', 
	'appRoutes', 
	'ngCookies',
	'ngSanitize',
	'ValidationDirectives',
	'MainCtrl', 
	'UserService', 
	'AdminCtrl',
	'Register',
	'ngMaterial',
	'CatService',
	'SearchService',
	'Account',
	'AccountService',
	'Header',
	'Search',
	'Browse',
	'Authentication',
	'dgs.profile',
	'dgs.watchlist',
	'dgs.searchform',
	'dgs.addToButtons',
	'Item',
	'ItemService',
	'WishListService'
]);

angular.module('dgs').run(function ($rootScope, $location, $route, User, countItem) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
    	if (next.params.hasOwnProperty('item')){
    		countItem.add(next.params.itemID);
    	}

    	if (next.restricted && !User.checkLogin()){
    		$location.path('/login');
			$route.reload();
    	}else{
    		if (User.checkLogin()){
    			$rootScope.showMenu = true;
    		}
    	}
    	
    	/*
    	User.getUserStatus()
	      .then(function(){
	        if (next.restricted && !User.checkLogin()){
	          $location.path('/login');
	          $route.reload();
	        }
	    });*/
  });
});