
/*(function () {
    'use strict';*/

    angular.module('Authentication', ['UserService']);

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
				if (response.data.success){
                    // save the user cookie
                    var sessionCookie = {};

                    sessionCookie.token = response.data._id;

                    var cookieDomain = "localhost";
                    var newDate = new Date();
                    var exp = new Date(newDate.setSeconds(newDate.getSeconds() + 30000));
                    $cookies.putObject('dgsUserAuth', sessionCookie, {
                      domain: cookieDomain,
                      expires: exp
                    });
                    
                    $rootScope.showMenu = true;
                    $rootScope.$broadcast('loginStateChange');

                    if ($scope.redirect != ''){
                        $location.path($scope.redirect).search($routeParams.action);
                    }else{
                        $location.path('/myaccount');    
                    }
				};
			});
        }



    }

    
/*
})();*/