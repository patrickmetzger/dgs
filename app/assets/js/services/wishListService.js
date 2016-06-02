// public/js/services/itemService.js
(function () {
    'use strict';

    angular.module('WishListService', ['UserService']);
	
    angular.module('WishListService').factory('wList', wishlist);
	function wishlist($http, User) {

		var deletingItem = function(itemID, action){
			var userData = User.getUserId();
			if (userData){
				// add to users wishlist
				var data = {
	                'userID' : userData.token,
	                'itemID' : itemID,
	                'action' : action
	            };
	            
	            return $http.post('/api/user/wishlist', data);
			}
		}

		var addingItem = function(itemID, action){
			var userData = User.getUserId();
			if (userData){
				// add to users wishlist
				var data = {
	                'userID' : userData.token,
	                'itemID' : itemID,
	                'action' : action
	            };

	            return $http.post('/api/user/wishlist', data);
			}
		}
		
		var inWishList = function(itemID){
            var userData = User.getUserId();
            var inWL = false;

            if (userData){
            	var userID = userData.token;
            	return $http.get('/api/user/wishlist/' + userID + '/' + itemID);
            }else{
            	return undefined;
            }

        };

		return {
			adding: function(itemID, action){
				return addingItem(itemID, action);
			},
			checkWishList : function(itemID) {                
                return inWishList(itemID);
            },
            removing: function(itemID, action){
            	return deletingItem(itemID, action);	
            }
		}

		
	}

})();