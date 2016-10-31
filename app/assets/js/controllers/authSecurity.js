var authSecurity = angular.module('AuthSecurity', ['UserService']);

var checkSecurity = function($state, User, $rootScope, $window){
	var stateName = $state.current;
	if(!User.checkAccessToken()){
		User.noAccess(stateName);
	};
};
