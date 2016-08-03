(function() {
	'use strict';

	angular.module('dgs.sellerInfo', ['ItemService', 'Authentication', 'UserService', 'WishListService', 'ItemService']);

	angular.module('dgs.sellerInfo')
		.directive("sellerInfo", sellerInfo);

	function sellerInfo(item, User, items){
		return {
			restrict: 'AE',
			scope: {
				userID: "@id"
			},
			templateUrl: 'views/directives/sellerInfo.html',
			link: function(scope, element, attr){

				attr.$observe('id', function(value) { 

					User.getUserByID(value).then(function(response){
		                scope.sellerInfo = response;
		            })

		            // Get Seller Information
		            items.getItemCountByID(value).then(function(response){
		                scope.sItems = response;
		            });

				})
			},
			controller: function($scope, $attrs, $location, $routeParams, $q, $http){

				// adding defaults
				$scope.action = 'add';
				$scope.followText = 'Sign in to follow user';

				// return the userID from directive
				$attrs.$observe('id', function(value) { 
					User.getUserByID(value).then(function(data) {
					    $scope.userData = data;
					}).catch(function() {
					    $scope.userData = 'unable to get the data';
					});
					// Are we already following this user?
					function checkingFollow(userID){
						User.checkIfFollow(value).then(function(data){
							if (data){
								$scope.action = 'delete';
								$scope.followText = 'Currently following this user';
							}else{
								$scope.action = 'add';
								if (User.getUserId()){
									$scope.followText = 'Follow this user';
								}else{
									$scope.followText = 'Sign in to follow user';
								}
							}
						});
					}

					// if we have been redirected with an action to add item to wishlist
					if ($routeParams.ActionFollow){
						if (checkingFollow(value) == 'add'){
							User.follow(value, action);
						}
						checkingFollow(value);
					}else{
						checkingFollow(value);
					}
					$scope.followUsr = function(action){

						if (User.checkLogin()){
							var userData = User.getUserId();
							var data = {
			                    'userID' : userData.token,
			                    'itemID' : value,
			                    'action' : action
			                };

							if (action == 'add'){

								$http.post('/api/user/follow', data);

								User.follow(value, action);
								checkingFollow(value);
							}else if (action == 'delete'){
								User.follow(value, action);
								checkingFollow(value);
							}
						}else{
							if (action == 'add'){
								User.checkAccessToken($location.path(), 'ActionFollow');
							}else if (action == 'delete'){
								User.checkAccessToken($location.path(), 'ActionFollowRemove');
							}
						}
					}
				});
			}
	  	};
	}

})();