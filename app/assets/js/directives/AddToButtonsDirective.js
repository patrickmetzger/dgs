(function() {
	'use strict';

	angular.module('dgs.addToButtons', ['ItemService', 'Authentication', 'UserService', 'WishListService']);

	angular.module('dgs.addToButtons')
		.directive("addToButtons", addToButtons);

	function addToButtons(item, User, wList){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs, $location, $routeParams) {
				$scope.action = 'add';
				$scope.wishListText = 'Add to Wish List';
				$scope.defaultBtnClass = 'btn-warning';
				$scope.action = 'add';
				var itemID = $routeParams.itemID;

				function checkList(itemID){
					if (wList.checkWishList(itemID)){
						wList.checkWishList(itemID).then(function(response){
							if (response.data){
								$scope.wishListText = 'Remove from Wish List';
								$scope.defaultBtnClass = 'btn-success';
								$scope.action = 'delete';
							}else{
								$scope.wishListText = 'Add to Wish List';
								$scope.defaultBtnClass = 'btn-warning';
								$scope.action = 'add';	
							}
						}, function(response){
							$scope.wishListText = 'Add to Wish List';
							$scope.defaultBtnClass = 'btn-warning';
							$scope.action = 'add';
						});
					}
					
				}

				// if we have been redirected with an action to add item to wishlist
				if ($routeParams.ActionAddTolist){
					checkList(itemID);
				}else{
					checkList(itemID);
				}

				// user has submitted wish list button
				$scope.addWishList = function(action){
					if (User.checkLogin()){
						if (action == 'add'){
							wList.adding(itemID, action);
							checkList(itemID);
						}else if (action == 'delete'){
							wList.removing(itemID, action);
							checkList(itemID);
						}
						
					}else{
						if (action == 'add'){
							User.checkAccessToken($location.path(), 'ActionAddTolist');
						}else if (action == 'delete'){
							User.checkAccessToken($location.path(), 'ActionrRemoveFromlist');
						}
						
					}
				};

			},
	        
			templateUrl: 'views/directives/addToButtons.html',
	  	};
	}

})();