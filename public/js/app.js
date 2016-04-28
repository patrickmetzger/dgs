// public/js/app.js
angular.module('dgs', [
	'ngRoute', 
	'appRoutes', 
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
	'Header',
	'Search'
]);

/*
angular.module('dgs').run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
    	AuthService.getUserStatus()
	      .then(function(){
	        if (next.restricted && !AuthService.isLoggedIn()){
	          $location.path('/login');
	          $route.reload();
	        }
	      });
  });
});
*/