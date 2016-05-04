// public/js/services/account.js
(function () {
    'use strict';

    angular.module('AccountService', ['UserService']);
	
    angular
        .module('AccountService')
        .factory('accountInfo', accountInfo);

	function accountInfo($http, $location, User) {
		//checkSecurity($location, user);

		return {
			userProfile: function(){
				
			}

		};
		
	}

})();