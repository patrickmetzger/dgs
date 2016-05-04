// public/js/app.js
angular.module('dgs', [
	'ngRoute', 
	'appRoutes', 
	'ngCookies',
	'ValidationDirectives',
	'MainCtrl', 
	'NerdCtrl', 
	'NerdService', 
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
	'Authentication'
]);

angular.module('dgs').run(function ($rootScope, $location, $route, User) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
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