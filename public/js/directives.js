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
(function() {
	'use strict';

	angular.module('dgs').directive("header", header);

	function header(){
		return{
			templateUrl: '/incs/header.html'
		}
	};

})();
(function() {
	'use strict';

	angular.module('dgs.profile', ['UserService']);

	angular.module('dgs.profile')
		.directive("userProfile", userProfile);

	function userProfile(User){
		
		var activeUserProfile = User.getProfile().then(function(response){
			var dataResponse = response.data;
			var profile = dataResponse;
		});

		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs) {
				User.getProfile().then(function(response){
					var dataResponse = response.data;
					$scope.profile = dataResponse;
				});
			},
	        
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

	angular.module('dgs.sellerInfo', ['ItemService', 'Authentication', 'UserService', 'WishListService']);

	angular.module('dgs.sellerInfo')
		.directive("sellerInfo", sellerInfo);

	function sellerInfo(item, User){
		return {
			restrict: 'AE',
			scope: {
				test: "=testing",
				sellerID: "=sellerID"
			},
			templateUrl: 'views/directives/sellerInfo.html',
			link: function(scope, element, attrs){
				console.log(attrs.test);
			},
			controller: function($scope) {
			}
	  	};
	}

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