angular.module('AuthControllers', ['UserService', 'UtilService']);

angular.module('AuthControllers').controller('login', login);
function login($scope, $rootScope, User, $location, $state, $stateParams, $cookies, userRoles) {
    // is there a redirect?
    var redirect = false;
    if($stateParams.action){
        redirect = true;
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
                var exp = new Date(newDate.setSeconds(60 * 60 * 5));

                $cookies.put('token', response.data.token, {
                  domain: cookieDomain,
                  expires: exp
                });

                // now create the user in UserService
                User.createUser();
               
                $rootScope.showMenu = true;
                $rootScope.showAccountMenu = false;
                $rootScope.$broadcast('loginStateChange');
                if (redirect){
                    $state.go($stateParams.state, ({item: $stateParams.item, itemID: $stateParams.itemID, action: $stateParams.action,}));
                }else if ($stateParams.state === 'admin'){
                    User.getUserRole().then(function(response){
                        if (response === 'admin'){
                            $state.go('admin');
                        }else{
                            $state.go('myaccount.profile');            
                        }
                    });
                }else{
                    $state.go('myaccount.profile');    
                }
			};
		}, function(response){
            if (response.status == '404'){
                // show unauthorized message
                $scope.message = 'Your account has not been verified yet.';
            }else if (response.status == '401'){
                // show unauthorized message
                $scope.message = 'Something went wrong with your login. Please try again!';
            }
            
        });
    }



}