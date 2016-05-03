
/*(function () {
    'use strict';*/

    angular.module('Authentication', ['UserService']);

    var checkSecurity = function($location, User){
        if (!User.checkAccessToken()){
            User.noAccess();    
        }
    };

    angular.module('Authentication').controller('login', login);
    function login($scope, $rootScope, User, $location, $route, $cookies) {
       
        $scope.login = function(loginData){
        	User.authenticate(loginData).then(function(response){
				// if we get a good response, redirect user to main account page where we can upsell them.
				if (response.data.success){
                    // save the user cookie
                    var sessionCookie = {};

                    sessionCookie.token = 1;

                    var cookieDomain = "localhost";
                    var newDate = new Date();
                    var exp = new Date(newDate.setSeconds(newDate.getSeconds() + 30000));
                    
                    $cookies.putObject('dgsUserAuth', sessionCookie, {
                      domain: cookieDomain,
                      expires: exp
                    });
                    $rootScope.showMenu = true;

                    $rootScope.$broadcast('loginStateChange');

                    $location.path('/myaccount');
                    $route.reload();
				};
			});
        }



    }

    
/*
})();*/