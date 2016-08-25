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