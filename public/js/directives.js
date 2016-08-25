(function() {
	'use strict';

	angular.module('dgs.addToButtons', ['ItemService', 'AuthControllers', 'UserService', 'WishListService']);

	angular.module('dgs.addToButtons')
		.directive("addToButtons", addToButtons);

	function addToButtons(item, User, wList){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs, $location, $state, $stateParams) {
				$scope.action = 'add';
				$scope.wishListText = 'Add to Wish List';
				$scope.defaultBtnClass = 'btn-warning';
				$scope.action = 'add';
				var itemID = $stateParams.itemID;

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
					return $scope.action;
				}

				// if we have been redirected with an action to add item to wishlist
				if ($stateParams.action){
					if (checkList(itemID) == 'add'){
						wList.adding(itemID, 'add');
					}
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
							User.checkAccessToken($state.current.name, $stateParams, 'ActionAddTolist');
						}else if (action == 'delete'){
							User.checkAccessToken($state.current.name, $stateParams, 'ActionRemoveFromlist');
						}

						
					}
				};

			},
	        
			templateUrl: 'views/directives/addToButtons.html',
	  	};
	}

})();
(function() {
	'use strict';

	angular.module('dgs').directive("header", header);

	function header(){
		return {
	        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
	        templateUrl: "views/incs/header.html",
	        controller: "header"
	    }
	};

})();
(function () {
    'use strict';

    angular.module('ValidationDirectives', ['UserService']);

    angular
        .module('ValidationDirectives')
        .directive('match', match);
    function match($parse) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          scope.$watch(function() { 
            return $parse(attrs.match)(scope).$$lastCommittedViewValue === ctrl.$modelValue;
          }, function(currentValue) {
            ctrl.$setValidity('mismatch', currentValue);
          });
        }
      };
    };


    angular
        .module('ValidationDirectives')
        .directive('checkEmail', checkEmail);
    
    function checkEmail($timeout, $q, $http) {
      return {
        restrict: 'AE',
        require: 'ngModel',
        link: function(scope, elm, attr, model) { 
          model.$asyncValidators.emailExists = function() {
            // check email to make sure it doesn't exist all ready
            var email = model.$viewValue;
            return $http.get('/api/user/' + email).then(function(res){
              $timeout(function(){
                model.$setValidity('emailExists', !res.data); 
              });
            }); 
            
          };
        }
      } 
    };


})();
(function () {
    'use strict';

    angular.module('dgs').directive("patternValidator", patternValidator);
      function patternValidator() {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function(scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {             
              var patt = new RegExp(attrs.patternValidator);
              
              var isValid = patt.test(viewValue);

              ctrl.$setValidity('passwordPattern', isValid);

              // angular does this with all validators -> return isValid ? viewValue : undefined;
              // But it means that the ng-model will have a value of undefined
              // So just return viewValue!
              return viewValue;
              
            });
          }
        };
    };

  })();
(function() {
	'use strict';

	angular.module('dgs.loginFrm', ['AuthControllers', 'UserService']);

	angular.module('dgs.loginFrm').directive("loginForm", login);

	function login(User){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs, $location, $routeParams) {

			},
	        
			templateUrl: 'views/directives/loginForm.html',
	  	};
	}

})();
(function() {
	'use strict';

	angular.module('dgs').directive("myAccountHeader", accountHeader);

	function accountHeader(){
		return {
	        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
	        templateUrl: "views/myaccount/myaccount_header.html"
	    }
	};

})();
(function() {
	'use strict';

	angular.module('dgs.profile', ['UserService', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

	angular.module('dgs.profile')
		.directive("userProfile", userProfile);

	function userProfile(){
		return {
			restrict: 'AE',
			controller: 'ProfileCtrl',	        
			templateUrl: 'views/myaccount/profile.directive.html',
	  	};
	}

})();
(function() {
	'use strict';

	angular.module('dgs.searchform', ['SearchService']);

	angular.module('dgs.searchform')
		.directive("searchForm", searchFrm);

	function searchFrm(){
		return {
			restrict: 'AE',
			require: '?ngModel',
			controller: 'search',	        
			templateUrl: 'views/directives/searchForm.html',
			link: function(scope, element, attrs, ngModel){
			}
	  	};
	}

})();
(function() {
	'use strict';

	angular.module('dgs.sellerInfo', ['ItemService', 'AuthControllers', 'UserService', 'WishListService', 'ItemService']);

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
						if (User.checkIfFollow(userID)){
							User.checkIfFollow(userID).then(function(data){
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
						}else{
							$scope.followText = 'Sign in to follow user';
						}
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
(function() {
	'use strict';

	angular.module('dgs.watchlist', ['UserService']);

	angular.module('dgs.watchlist')
		.directive("watchList", watchList);

	function watchList(User){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs) {
				var uID = User.getUserId();
				$scope.watchList = User.getWatchList(uID);
			},
	        
			templateUrl: 'views/directives/watchlist.html',
	  	};
	}

})();