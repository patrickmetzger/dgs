// public/js/appRoutes.js
angular.module('appRoutes', ['UserService'])
    .config(['$routeProvider','$httpProvider', '$locationProvider', 'UserProvider', 
        function($routeProvider, $httpProvider, $locationProvider, UserProvider) {

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
        .when('/register/registration-success', {
            templateUrl: 'views/registration/register-success.html',
            restricted: false    
        })
        .when('/register/registration-verify/:token', {
            templateUrl: 'views/registration/register-verify.html',
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
        });

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