(function () {
    'use strict';

    angular.module('Account', ['SearchService', 'UserService', 'CatService', 'AccountService']);

    angular.module('Account').controller('account', account);
    function account($scope, $http, $location, $rootScope, User, searching, category, accountInfo) {

        $scope.title = 'My Account';

        $scope.activeProfile = User.getProfile().then(function(response){
			var dataResponse = response.data;
			$scope.profile = dataResponse;
			console.log($scope.profile);
		});


    }

    

})();


// public/js/controllers/AdminCtrl.js
angular.module('AdminCtrl', []).controller('AdminController', function($scope) {

    $scope.tagline = 'Admin Home Page';   

});

/*(function () {
    'use strict';*/

    angular.module('Authentication', ['UserService']);

    angular.module('Authentication').controller('checkSecurity', checkSecurity);
    function checkSecurity($scope, $location, User){
        
        if (!User.checkAccessToken()){
            user.noAccess();    
         }
    };

    angular.module('Authentication').controller('login', login);
    function login($scope, $rootScope, User, $location, $route, $cookies) {
       
        $scope.login = function(loginData){
        	User.authenticate(loginData).then(function(response){
				// if we get a good response, redirect user to main account page where we can upsell them.
				if (response.data.success){
                    // save the user cookie
                    var sessionCookie = {};

                    sessionCookie.token = response.data._id;

                    var cookieDomain = "localhost";
                    var newDate = new Date();
                    var exp = new Date(newDate.setSeconds(newDate.getSeconds() + 30000));
                    $cookies.putObject('dgsUserAuth', sessionCookie, {
                      domain: cookieDomain,
                      expires: exp
                    });
                    
                    $rootScope.showMenu = true;
                    $rootScope.$broadcast('loginStateChange');

                    $location.path('/myaccount');
                    $route.reload();
				};
			});
        }



    }

    
/*
})();*/
(function () {
    'use strict';

    angular.module('Browse', ['SearchService', 'CatService']);

    angular.module('Browse').controller('browse', browse);
    function browse($scope, $http, $location, $rootScope, searching, category, catList) {

    	catList.getActiveList().then(function(cats){
			$scope.allCats = cats;
		});

        $scope.searching = function(){
            $location.path('/search?category=' + $scope.category + '&keyword=' + $scope.keyword);
            searching.getData($scope.category, $scope.keyword);
            
        }



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

	function register($scope, User) {

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

				};
			});
			

	    }   

	};

})();
(function () {
    'use strict';

    angular.module('Search', ['SearchService', 'CatService']);

    angular.module('Search').controller('search', search);
    function search($scope, $http, $location, $rootScope, searching, category) {
       
        $scope.searching = function(){
            $location.path('/search?category=' + $scope.category + '&keyword=' + $scope.keyword);
            searching.getData($scope.category, $scope.keyword);
            
        }



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