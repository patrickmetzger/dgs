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
// public/js/appRoutes.js
angular.module('appRoutes', ['UserService', 'ngFileUpload', 'ngImgCrop'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'UserProvider', 
        function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, UserProvider) {

            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: "/",
                    controller: 'MainController',
                    restricted: false,
                    templateUrl: "views/home.html"
                })
                .state('search_category', {
                    url: "/search:category",
                    templateUrl: "views/search/search.view.html",
                    restricted: false,
                    controller: "search"
                })
                .state('browse', {
                    url: "/browse-items",
                    templateUrl: "views/browse.view.html",
                    restricted: false,
                    controller: "browse"
                })
                .state('browse_category', {
                    url: "/browse-items/:catType",
                    templateUrl: "views/browse.items.html",
                    restricted: false,
                    controller: "browseItems"
                })
                .state('item', {
                    url: "/item/:item/:itemID",
                    templateUrl: "views/item.view.html",
                    restricted: false,
                    controller: "item",
                    params: {
                        item: null,
                        itemID: null,
                        action: null
                    },
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "views/login.html",
                    restricted: false,
                    params: {
                        state: null,
                        item: null,
                        itemID: null,
                        action: null,
                    },
                })
                .state('register', {
                    url: "/register",
                    templateUrl: "views/register.html",
                    restricted: false
                })
                .state('register_success', {
                    url: "/register/registration-success",
                    templateUrl: "views/registration/register-success.html",
                    restricted: false
                })
                .state('verify_success', {
                    url: "/verify-success",
                    templateUrl: "views/registration/verify-success.html",
                    restricted: false
                })
                .state('myaccount', {
                    url: "/myaccount",
                    templateUrl: "views/myaccount/index.html",
                    restricted: true,
                    controller: 'account'
                })
                .state('admin', {
                    url: "/admin",
                    templateUrl: "views/admin/index.html",
                    restricted: true
                })

    /*
    $routeProvider

        // nerds page that will use the NerdController
        .when("/search:category", {
            controller: "search",
            templateUrl: "views/search/search.view.html",
            restricted: false
        })
        .when('/browse-items', {
            templateUrl: 'views/browse.view.html',
            controller: "browse",
            restricted: false
        })
        .when('/browse-items/:catType', {
            templateUrl: 'views/browse.items.html',
            controller: "browseItems",
            restricted: false
        })
        .when('/item/:item/:itemID', {
            templateUrl: 'views/item.view.html',
            controller: "item",
            restricted: false
        })
        .when('/register/registration-success', {
            templateUrl: 'views/registration/register-success.html',
            restricted: false    
        })
        .when('/register/registration-verify/:token', {
            templateUrl: 'views/registration/register-verify.html',
            controller: 'registerVerify',
            restricted: false
        })
        .when('/verify-success', {
            templateUrl: 'views/registration/verify-success.html',
            restricted: false
        })
        .when('/myaccount', {
            templateUrl: 'views/myaccount/index.html',
            controller: 'account',
            restricted: true
        })
        .when('/admin', {
            templateUrl: 'views/admin/index.html',
            controller: 'AdminController',
            restricted: true
        })
        .otherwise({
            redirectTo: '/'
        });*/

        $httpProvider.interceptors.push(function($q){
            return {
                "request": function(config){
                    var accessToken = UserProvider.$get().getToken();
                    if (accessToken){
                        config.headers.Authorization = "Bearer " + accessToken;
                    }                   

                    return config;    
                },
                "response": function(response){
                    return response;
                }
            }
        });

    $locationProvider.html5Mode(true);

}]);