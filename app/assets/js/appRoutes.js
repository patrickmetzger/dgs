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