// public/js/app.js
angular.module('dgs', [
	'Main',
	'ui.router',
	'ngRoute', 
	'appRoutes', 
	'ngCookies',
	'ngSanitize',
	'AuthSecurity',
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
	'AuthControllers',
	'dgs.loginFrm',
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
	'ngImgCrop',
	'EmailService',
	'ui.bootstrap',
	'ui.router.modal',
	'Profile'
	]);

angular.module('dgs').run(function ($http, $rootScope, $cookies, $location, $state, User, countItem, Util, AuthService, authEvents, userRoles) {
	//$http.defaults.headers.common = 'application/json';
	if ($cookies.get('token')) {
		$http.defaults.headers.Authorization = 'Bearer ' + $cookies.get('token');
	}
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		if (User.getToken()){
			User.getUserId().then(function(response){
				User.getUserByID(response.data).then(function(response){
					var role = response.data.role;
					$rootScope.$broadcast(userRoles.role);
				})
			});
		}

		if ('data' in toState && 'authorizedRoles' in toState.data) {
			var authorizedRoles = toState.data.authorizedRoles;
			if (!AuthService.isAuthorized(authorizedRoles)) {
				e.preventDefault();
				$location.url($location.current, {}, {reload: true});
				$rootScope.$broadcast(authEvents.notAuthorized);
			}
		}

		if (toParams.hasOwnProperty('item')){
    		countItem.add(toParams.itemID);
    	}

    	if (toState.restricted && !User.checkLogin()){
    		$state.go('login', {refresh: true});
    	}else{
    		if (User.checkLogin()){
    			$rootScope.showMenu = true;
    		}
    	}

    	console.log($rootScope);
	});
});