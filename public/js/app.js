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
// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController',
            restricted: false
        })
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
        .when('/login', {
            templateUrl: 'views/login.html',
            restricted: false
        })
        .when('/register', {
            templateUrl: 'views/register.html',
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
        });

    $locationProvider.html5Mode(true);

}]);