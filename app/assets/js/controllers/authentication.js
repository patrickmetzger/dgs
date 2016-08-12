
/*(function () {
    'use strict';*/

    angular.module('Authentication', ['UserService', 'UtilService']);

    angular.module('Authentication').controller('checkSecurity', checkSecurity);
    function checkSecurity($scope, $location, User){
        
        if (!User.checkAccessToken()){
            user.noAccess();    
         }
    };

    angular.module('Authentication').controller('login', login);
    function login($scope, $rootScope, User, $location, $route, $routeParams, $cookies) {
        // is there a redirect?
        $scope.redirect = '';
        if($routeParams.ref){
            $scope.redirect = $routeParams.ref;
        };
        
        $scope.login = function(loginData){
        	User.authenticate(loginData).then(function(response){
				// if we get a good response, redirect user to main account page where we can upsell them.
				if (response.data.token){
                    // save the user cookie
                    var sessionCookie = {};
                    sessionCookie.token = response.data.token;

                    var cookieDomain = "localhost";
                    var newDate = new Date();
                    var exp = new Date(newDate.setSeconds(newDate.getSeconds() + 30000));

                    $cookies.put('token', response.data.token, {
                      domain: cookieDomain,
                      expires: exp
                    });

                    // now create the user in UserService
                    User.createUser();
                   
                    $rootScope.showMenu = true;
                    $rootScope.$broadcast('loginStateChange');

                    if ($scope.redirect != ''){
                        $location.path($scope.redirect).search($routeParams.action);
                    }else{
                        $location.path('/myaccount');    
                    }
				};
			}, function(response){
                // show unauthorized message
                $scope.message = 'Something went wrong with your login. Please try again!';
            });
        }



    }

    
/*
})();*/