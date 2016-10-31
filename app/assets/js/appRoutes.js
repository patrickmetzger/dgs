// public/js/appRoutes.js
angular.module('appRoutes', ['UserService', 'ngFileUpload', 'ngImgCrop'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'UserProvider', 
        function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, UserProvider) {

            $stateProvider
                .state('home', {
                    url: "/",
                    controller: 'MainController',                  
                    views: {
                        'master': {
                            templateUrl: "views/_main.html"
                        },
                        'home@home': {
                            templateUrl: "views/home.html"
                        }
                    }
                })
                .state('search_category', {
                    url: "/search:category",
                    restricted: false,
                    nav: "search",
                    controller: "search",
                    views: {
                        "master": {
                            templateUrl: "views/_main.html",
                        },
                        "topbar@search_category": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@search_category": {
                            templateUrl: "views/search/search.view.html",
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
                })
                .state('browse', {
                    url: "/browse-items",
                    nav: "browse",
                    restricted: false,
                    views: {
                        "master": {
                            templateUrl: "views/_main.html"
                        },
                        "topbar@browse": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@browse": {
                            templateUrl: "views/browse.view.html",
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
                    //controller: "browse"
                })
                .state('browse_category', {
                    url: "/browse-items/:catType",
                    nav: "browse",

                    views: {
                        "master": {
                            templateUrl: "views/_main.html"
                        },
                        "topbar@browse_category": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@browse_category": {
                            templateUrl: "views/browse.items.html",
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
                    params: {
                        catType: null
                    },
                    restricted: false
                })
                .state('item', {
                    url: "/item/:item/:itemID",
                    nav: "browse",
                    views: {
                        "master": {
                            templateUrl: "views/_main.html",
                        },
                        "topbar@item": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@item": {
                            templateUrl: "views/item.view.html",
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
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
                    nav: "login",
                    restricted: false,
                    views: {
                        "master": {
                            templateUrl: "views/_main.html",
                        },
                        "topbar@login": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@login": {
                            templateUrl: "views/login.html"
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
                    params: {
                        state: null,
                        item: null,
                        itemID: null,
                        action: null,
                    },
                })
                .state('register', {
                    url: "/register",
                    nav: "register",
                    views: {
                        "master": {
                            templateUrl: "views/_main.html",
                        },
                        "topbar@register": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@register": {
                            templateUrl: "views/register.html"
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
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
                    views: {
                        "master": {
                            templateUrl: "views/_main.html",
                        },
                        "topbar@myaccount": {
                            templateUrl: "/views/_topbar.html",
                        },
                        "content@myaccount": {
                            templateUrl: "views/myaccount/index.html"
                        },
                        "footer":{
                            templateUrl: "views/incs/footer.html",
                        }
                    },
                    restricted: true,
                    abstract: true,

                })
                .state('myaccount.home', {
                    url: "/home",
                    templateUrl: "views/myaccount/myaccount_index.html",
                    restricted: true,
                    controller: 'account',
                    params: {
                        tab: null
                    },
                })
                .state('myaccount.profile', {
                    url: "/profile",
                    templateUrl: "views/myaccount/myaccount_index.html",
                    restricted: true,
                    controller: 'account',
                    params: {
                        tab: 'profile'
                    },
                })
                .state('myaccount.items', {
                    url: "/my-items",
                    templateUrl: "views/myaccount/myaccount_index.html",
                    restricted: true,
                    controller: 'account',
                    params: {
                        tab: 'items'
                    },
                })
                .state('myaccount.watchlist', {
                    url: "/my-watchlist",
                    templateUrl: "views/myaccount/myaccount_index.html",
                    restricted: true,
                    controller: 'account',
                    params: {
                        tab: 'watchlist'
                    },
                })
                .state('myaccount.item_add_edit', {
                    url: "/item_add_edit",
                    templateUrl: "views/myaccount/item_add_update.html",
                    restricted: true,
                    controller: 'ItemAddEdit',
                    params: {
                        itemID: null
                    },
                })
                .state('admin', {
                    url: "/admin",
                    templateUrl: "views/admin/index.html",
                    controller: 'AdminCtrl',
                    nav: 'admin',
                    restricted: true
                })
                .state('admin_cats', {
                    url: "/admin/categories",
                    templateUrl: "views/admin/cats.html",
                    controller: 'AdminCatsCtrl',
                    nav: 'admin',
                    restricted: true
                })
                .state('admin_users', {
                    url: "/admin/users",
                    templateUrl: "views/admin/users.html",
                    controller: 'AdminUsersCtrl',
                    nav: 'admin',
                    restricted: true
                })

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