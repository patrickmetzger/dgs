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
	'Seller',
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
	'dgs.sellerInfo',
	'Item',
	'ItemService',
	'WishListService',
	'UtilService',
	'dgs.authService',
	'ngFileUpload',
	'ngImgCrop'
]);

angular.module('dgs').run(function ($http, $rootScope, $cookies, $location, $route, User, countItem, Util, AuthService, authEvents) {
	//$http.defaults.headers.common = 'application/json';
	if ($cookies.get('token')) {
		$http.defaults.headers.Authorization = 'Bearer ' + $cookies.get('token');
	}
/*
  	$rootScope.$on('$routeChangeStart', function (event, next, current) {
  		
  		if ('data' in next && 'authorizedRoles' in next.data) {
	      var authorizedRoles = next.data.authorizedRoles;
	      if (!AuthService.isAuthorized(authorizedRoles)) {
	        event.preventDefault();
	        $location.url($location.current, {}, {reload: true});
	        $rootScope.$broadcast(authEvents.notAuthorized);
	      }
	    }

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
    	}*/
    	
    	/*
    	User.getUserStatus()
	      .then(function(){
	        if (next.restricted && !User.checkLogin()){
	          $location.path('/login');
	          $route.reload();
	        }
	    });
  });*/
});