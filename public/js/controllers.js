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

/*(function () {
    'use strict';*/

    angular.module('Authentication', ['UserService', 'UtilService']);

    angular.module('Authentication').controller('checkSecurity', checkSecurity);
    function checkSecurity($scope, $location, User){
        
        if (!User.checkAccessToken()){
            user.noAccess();    
         }
    };

    angular.module('Authentication').controller('login', login);
    function login($scope, $rootScope, User, $location, $route, $routeParams, $cookies) {
        // is there a redirect?
        $scope.redirect = '';
        if($routeParams.ref){
            $scope.redirect = $routeParams.ref;
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

                    if ($scope.redirect != ''){
                        $location.path($scope.redirect).search($routeParams.action);
                    }else{
                        $location.path('/myaccount');    
                    }
				};
			}, function(response){
                // show unauthorized message
                $scope.message = 'Something went wrong with your login. Please try again!';
            });
        }



    }

    
/*
})();*/
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
    function browseitems($scope, $http, $location, $rootScope, category, catList, items, $routeParams) {
        category.getData($routeParams.catType).then(function(catData){
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

        $scope.category = $routeParams.category;
        $scope.keyword = $routeParams.keyword;
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
    function header($scope, $rootScope, $location, $routeParams, User, catList, $route) {
		$scope.route = $route;
        
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
    function item($scope, $http, $location, $rootScope, $routeParams, searching, category, User, item, items) {

        // get Item data
    	item.getItemByID($routeParams.itemID).then(function(response){
            $scope.itemData = response.data;
            $scope.status = response.status;

            $scope.sellerID = $scope.itemData.sellerID;

        }, function(response) {
            $scope.itemData = "Request failed";
            $scope.status = response.status;
        });
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
// public/js/controllers/register.js
(function () {
    'use strict';

    angular.module('Register', ['UserService']);
	
    angular
        .module('Register')
        .controller('tab', tab);

	function tab($scope, $routeParams) {
		$scope.selectedIndex = 0;
		if ($routeParams.register){
			$scope.selectedIndex = 1;
		};
		
		return $scope.selectedIndex;
	};

    angular
        .module('Register')
        .controller('register', register);

	function register($scope, User, $location, $route) {

	    $scope.tagline = 'Sign In / Register';

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
					$location.path('/register/registration-success');
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