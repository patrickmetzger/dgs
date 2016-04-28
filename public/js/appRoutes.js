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
        .when('/register', {
          templateUrl: 'views/register.html',
          restricted: false
        })
        .when('/admin', {
            templateUrl: 'views/admin/index.html',
            controller: 'AdminController',
            restricted: true
        });

    $locationProvider.html5Mode(true);

}]);