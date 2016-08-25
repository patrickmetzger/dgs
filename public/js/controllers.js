(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'UserService', 'CatService', 'AccountService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $location, $rootScope, User, category, accountInfo) {
		
        $scope.title = 'My Account';

    }

    

})();


// public/js/controllers/AdminCtrl.js
angular.module('AdminCtrl', []).controller('AdminController', function($scope) {

    $scope.tagline = 'Admin Home Page';   

});
angular.module('AuthControllers', ['UserService', 'UtilService']);

angular.module('AuthControllers').controller('checkSecurity', security);
function security($scope, $location, User){
    if (!User.checkAccessToken()){
        user.noAccess();    
    }
};

angular.module('AuthControllers').controller('login', login);
function login($scope, $rootScope, User, $location, $state, $stateParams, $cookies) {
    // is there a redirect?
    var redirect = false;
    if($stateParams.action){
        redirect = true;
    };

    $scope.login = function(loginData){
    	User.authenticate(loginData).then(function(response){
			// if we get a good response, redirect user to main account page where we can upsell them.
			if (response.data.token){
                // save the user cookie
                var sessionCookie = {};
                sessionCookie.token = response.data.token;

                var cookieDomain = "localhost";
                var newDate = new Date();
                var exp = new Date(newDate.setSeconds(newDate.getSeconds() + 30000));

                $cookies.put('token', response.data.token, {
                  domain: cookieDomain,
                  expires: exp
                });

                // now create the user in UserService
                User.createUser();
               
                $rootScope.showMenu = true;
                $rootScope.$broadcast('loginStateChange');
                if (redirect){
                    $state.go($stateParams.state, ({item: $stateParams.item, itemID: $stateParams.itemID, action: $stateParams.action,}));
                }else{
                    $state.go('myaccount');    
                }
			};
		}, function(response){
            if (response.status == '404'){
                // show unauthorized message
                $scope.message = 'Your account has not been verified yet.';
            }else if (response.status == '401'){
                // show unauthorized message
                $scope.message = 'Something went wrong with your login. Please try again!';
            }
            
        });
    }



}
var authSecurity = angular.module('AuthSecurity', ['UserService']);

var checkSecurity = function($location, User, $rootScope, $window){
	if(!User.checkAccessToken()){
		User.noAccess();
	};
};

(function () {
    'use strict';

    angular.module('Browse', ['SearchService', 'CatService', 'ItemService']);

    angular.module('Browse').controller('browse', browse);
    function browse($scope, $http, $location, $rootScope, category, catList) {
    	catList.getActiveList().then(function(cats){
			$scope.allCats = cats;
		});
    }

    angular.module('Browse').controller('browseItems', browseitems);
    function browseitems($scope, $http, $location, $rootScope, category, catList, items, $stateParams) {
        category.getData($stateParams.catType).then(function(catData){
            if (catData.data && catData.data._id != ''){
                var catID = catData.data._id;
                $scope.catName = catData.data.name;
                $scope.items = '';
                // Get all items based on catID
                items.getItemsByCat(catID).then(function(items){
                    if (items.data.length > 0){
                        $scope.items = items.data;
                    }
                });
            }
        });

        $scope.filters = {};
        $scope.sort = 'price';

        $scope.category = $stateParams.category;
        $scope.keyword = $stateParams.keyword;
        if ($scope.keyword != ''){
            $scope.filters["name"] = $scope.keyword;
        }

        return undefined;
    }

    

})();

(function () {
    'use strict';

    angular.module('Header', ['UserService', 'CatService']);
	
    angular
        .module('Header')
        .controller('header', header);
    function header($scope, $rootScope, $location, $stateParams, User, catList, $state) {
		$scope.state = $state;
        
        $scope.isLoggedIn = User.checkLogin();
        $scope.menuLogoutClick = User.doLogout($scope);
        $rootScope.$on('loginStateChange', function(){
        });
        // get category list
        catList.getActiveList().then(function(cats){
            $scope.activeCatList = cats;
        });

	}

})();

(function () {
    'use strict';

    angular.module('Item', ['SearchService', 'CatService', 'ItemService', 'UserService']);

    angular.module('Item').controller('item', item);
    function item($scope, $http, $location, $rootScope, $stateParams, searching, category, User, item, items) {

        // get Item data
    	item.getItemByID($stateParams.itemID).then(function(response){
            $scope.itemData = response.data;
            $scope.status = response.status;

            $scope.sellerID = $scope.itemData.sellerID;

        }, function(response) {
            $scope.itemData = "Request failed";
            $scope.status = response.status;
        });
    }   

})();

(function () {
    'use strict';

    angular.module('Main', ['UserService']);

    angular.module('Main').controller('main', main);
    function main($scope, $http, $location, $state, $stateParams, $rootScope, User) {
		$scope.$watch(User.checkLogin, function (value, oldValue) {
		    if(!value && oldValue) {
		      console.log("Disconnect");
		      $state.go('login');
		    }
		}, true);

    }

    

})();


// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.tagline = 'To the moon and back!'; 

});
// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', ['NerdService', 'UserService'])
	.controller('NerdController', function($scope, Nerd, User) {

		$scope.allNerds = Nerd.get().then(function(response){
			var dataResponse = response.data;
			$scope.nerds = dataResponse;
		});

		var allUsers = User.get().then(function(response){
			var users = response.data;
			$scope.users = users;
		});

    $scope.tagline = 'Nothing beats a pocket protector!!!!!';

});
(function () {
    'use strict';

    angular.module('Profile', ['UserService', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

    angular.module('Profile').controller('ProfileCtrl', profile);
    function profile($scope, $http, $location, $rootScope, $uibModal, $log, Upload, User) {
		checkSecurity($location, User);

		$scope.onTabChanges = function(currentTabIndex){
			checkSecurity($location, User);
		};

        var $ctrl = this;

        if (User.checkLogin()){
        	$scope.profileData = User.buildProfile().then(function(response){
	        	$scope.profile = response;
	        });
        }
        

		$ctrl.animationsEnabled = true;
		$scope.open = function () {
			if (User.checkLogin()){
				var modalInstance = $uibModal.open({
				  animation: $ctrl.animationsEnabled,
				  ariaLabelledBy: 'modal-title',
				  ariaDescribedBy: 'modal-body',
				  templateUrl: 'myModalContent.html',
				  controller: 'ModalInstanceCtrl',
				  controllerAs: '$ctrl',
				  resolve: {
				    items: function () {
				      return $ctrl.items;
				    }
				  }
				});

				modalInstance.result.then(function (selectedItem) {
				  $ctrl.selected = selectedItem;
				}, function () {
				  $log.info('Modal dismissed at: ' + new Date());
				});
			}else{
				$state.go('login');
			}
			
		};

		$ctrl.openComponentModal = function () {
		var modalInstance = $uibModal.open({
		  animation: $ctrl.animationsEnabled,
		  component: 'modalComponent',
		  resolve: {
		    items: function () {
		      return $ctrl.items;
		    }
		  }
		});

		modalInstance.result.then(function (selectedItem) {
		  $ctrl.selected = selectedItem;
		}, function () {
		  $log.info('modal-component dismissed at: ' + new Date());
		});
		};

		$ctrl.toggleAnimation = function () {
		$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
    }

    

    angular.module('Profile').controller('ModalInstanceCtrl', function (User, $uibModalInstance, $scope, Upload, $timeout) {
	  	var $ctrl = this;
	  	
		$scope.upload = function (dataUrl, name) {
			if (name){
				Upload.upload({
				  	url: '/api/uploads',
			        data: {
			            file: Upload.dataUrltoBlob(dataUrl, name)
			        },
				}).then(function (response) {
			        $timeout(function () {
			            $scope.result = response.data;

			            // lets update the users information
			            User.updateThumb(name);
			            // now close the modal box
			            $uibModalInstance.close();
			            
			            location.reload();
			        });
			    }, function (response) {
			        if (response.status > 0) $scope.errorMsg = response.status 
			            + ': ' + response.data;
			    }, function (evt) {
			        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			    });	
			}else{
				//no name
				console.log('failed');
			}
		} 
	});

	// Please note that the close and dismiss bindings are from $uibModalInstance.

	angular.module('Profile').component('modalComponent', {
	  templateUrl: 'myModalContent.html',
	  bindings: {
	    resolve: '<',
	    close: '&',
	    dismiss: '&'
	  },
	  controller: function () {
	    var $ctrl = this;

	    $ctrl.$onInit = function () {
	      $ctrl.items = $ctrl.resolve.items;
	      $ctrl.selected = {
	        item: $ctrl.items[0]
	      };
	    };

	    $ctrl.ok = function () {
	      $ctrl.close({$value: $ctrl.selected.item});
	    };

	    $ctrl.cancel = function () {
	      $ctrl.dismiss({$value: 'cancel'});
	    };
	  }
	});


})();
// public/js/controllers/register.js
(function () {
    'use strict';

    angular.module('Register', ['UserService']);
	
    angular
        .module('Register')
        .controller('tab', tab);

	function tab($scope, $stateParams) {
		$scope.selectedIndex = 0;
		if ($stateParams.register){
			$scope.selectedIndex = 1;
		};
		
		return $scope.selectedIndex;
	};

	angular
        .module('Register')
        .controller('registerVerify', verify);

	function verify($scope, User, $location, $state) {
		console.log('ljkjlj');
	}

    angular
        .module('Register')
        .controller('register', register);

	function register($scope, User, $location, $state) {
	    $scope.tagline = 'Sign In / Register';

	    $scope.credentials = {
          password: ''
        };

	    $scope.register = function(formData){
	    	var postData = {};

	    	postData.fName = formData.fName;
	    	postData.lName = formData.lName;
	    	postData.fullName = formData.fName + ' ' + formData.lName;
	    	postData.email = formData.email;
	    	postData.zipcode = formData.zipcode;
	    	postData.url = '';
	    	postData.imgThumb = '';
	    	postData.imgFull = '';
	    	postData.password = formData.password;
	    	
	    	User.create(postData).then(function(response){
				// if we get a good response, redirect user to main account page where we can upsell them.
				if (response.data._id.length){
					// send welcome email
					User.sendWelcomeMail(response.data);
					$state.go('register_success');
				};
			});
			

	    }   

	};

})();
(function () {
    'use strict';

    angular.module('Search', ['SearchService', 'CatService']);

    angular.module('Search').controller('search', search);
    function search($scope, $http, $location, $rootScope, $route, $routeParams, searching, category) {
        $scope.category = $routeParams.category;
        $scope.keyword = $routeParams.keyword;

        if($location.$$search.keyword){
            $scope.keyword = $location.$$search.keyword;            
        }

        $scope.searching = function(){
            if ($scope.keyword != ''){
                $location.path('/browse-items/' + $scope.category).search('keyword', $scope.keyword);    
            }else{
                $location.path('/browse-items/' + $scope.category).search({});
            }            
        }
    }

})();


(function () {
    'use strict';

    angular.module('Seller', ['UserService', 'ItemService']);

    angular.module('Seller').controller('seller', seller);
    function seller($scope, $location, $rootScope, $routeParams, User, item) {
        $scope.testing = 'testing';
        // get Item data
    	User.getUserByID($routeParams.id).then(function(response){    

        }, function(response) {
        
        });

    }   

})();

// public/js/controllers/register.js
(function () {
    'use strict';

    angular.module('Tab', ['UserService']);
	
    angular
        .module('Tab')
        .controller('tab', tab);

	function tab($scope, User) {

	};

})();
(function () {
    'use strict';

    angular.module('TestCtrl', ['ui.bootstrap']);

    angular.module('TestCtrl').controller('TestController', test);
    function test($scope, $http, $location, $rootScope, $uibModal, $log) {
		
        var $ctrl = this;
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = true;

		$ctrl.open = function (size) {
		var modalInstance = $uibModal.open({
		  animation: $ctrl.animationsEnabled,
		  ariaLabelledBy: 'modal-title',
		  ariaDescribedBy: 'modal-body',
		  templateUrl: 'myModalContent.html',
		  controller: 'ModalInstanceCtrl',
		  controllerAs: '$ctrl',
		  size: size,
		  resolve: {
		    items: function () {
		      return $ctrl.items;
		    }
		  }
		});

		modalInstance.result.then(function (selectedItem) {
		  $ctrl.selected = selectedItem;
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
		};

		$ctrl.openComponentModal = function () {
		var modalInstance = $uibModal.open({
		  animation: $ctrl.animationsEnabled,
		  component: 'modalComponent',
		  resolve: {
		    items: function () {
		      return $ctrl.items;
		    }
		  }
		});

		modalInstance.result.then(function (selectedItem) {
		  $ctrl.selected = selectedItem;
		}, function () {
		  $log.info('modal-component dismissed at: ' + new Date());
		});
		};

		$ctrl.toggleAnimation = function () {
		$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
    }

    

    angular.module('TestCtrl').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('TestCtrl').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});


})();