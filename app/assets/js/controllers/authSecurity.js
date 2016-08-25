var authSecurity = angular.module('AuthSecurity', ['UserService']);

var checkSecurity = function($location, User, $rootScope, $window){
	if(!User.checkAccessToken()){
		User.noAccess();
	};
};
