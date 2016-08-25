// public/js/services/account.js

    angular.module('TestService', ['UserService']);
	
    angular
        .module('TestService')
        .factory('testing', test);

	function test() {
		
		var checkAccess = function(){
			return true;
		}

		return {
			check: function(){
				return checkAccess();
			}
		};
		
	}

