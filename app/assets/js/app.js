// public/js/app.js
angular.module('dgs', [
	'Main',
	'ui.router',
	'ngRoute', 
	'appRoutes', 
	'ui.mask',
	'ngCookies',
	'ngSanitize',
	'ngNotify',
	'AuthSecurity',
	'ValidationDirectives',
	'PasswordVerify',
	'MainCtrl', 
	'UserService', 
	'Admin',
	'AdminServices',
	'Register',
	'ngMaterial',
	'Seller',
	'CatService',
	'SearchService',
	'MyAccount_Tab',
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

	$rootScope.location = $location;

	//$http.defaults.headers.common = 'application/json';
	if ($cookies.get('token')) {
		$http.defaults.headers.Authorization = 'Bearer ' + $cookies.get('token');
	}
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		$rootScope.isAdmin = false;
		if (User.getToken()){
			User.getUserId().then(function(response){
				User.getUserByID(response).then(function(response){
					User.getUserRole().then(function(role){
						if (role === 'admin'){
							$rootScope.isAdmin = true;
						}
					});
					$rootScope.$broadcast(userRoles.role);
				})
			}, function(response){
				// lets redirect to the login
				AuthService.logout();
				$state.go('login', {refresh: true});
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
    			$rootScope.showAccountMenu = true;
    		}
    	}

    	document.addEventListener("keyup", function(e) {
	        if (e.keyCode === 27)
	            $rootScope.$broadcast("escapePressed", e.target);
	    });

	    document.addEventListener("click", function(e) {
	        $rootScope.$broadcast("documentClicked", e.target);
	    });

	});
});