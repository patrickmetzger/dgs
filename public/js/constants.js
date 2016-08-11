// Constants used by the entire app
(function () {
    'use strict';
	
	angular.module('dgs')
	 
	.constant('authEvents', {
	  	notAuthenticated: 'auth-not-authenticated',
	  	notAuthorized: 'auth-not-authorized'
	})
	 
	.constant('userRoles', {
	  	guest: 'guest',
		user: 'user',
		admin: 'admin'
	});

})();