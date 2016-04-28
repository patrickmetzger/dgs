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
		console.log($scope.selectedIndex);
		
		return '';
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
	    	
	    	User.create(postData).then(function(response){
				// if we get a good response, redirect user to main account page where we can upsell them.
				if (response.data._id.length){

				};
			});
			

	    }   

	};

})();