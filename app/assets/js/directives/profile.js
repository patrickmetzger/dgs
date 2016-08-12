(function() {
	'use strict';

	angular.module('dgs.profile', ['UserService', 'ngFileUpload', 'ngImgCrop']);

	angular.module('dgs.profile')
		.directive("userProfile", userProfile);

	function userProfile(User){
		return {
			restrict: 'AE',
			controller: function($scope, $element, $attrs, Upload, $timeout) {
				$scope.profile = {};
				User.getUserId().then(function(response){
					var uid = response.data;
					User.getUserByID(uid).then(function(response){
						$scope.profile = {
							'photo': response.data.imgFull,
							'fullName': response.data.fullName,
							'email': response.data.email,
							'postal': response.data.zipCode
						}
					})
				});

				$scope.upload = function (dataUrl, name) {

					console.log(name);

			        Upload.upload({
					  	url: '/api/uploads',
			            data: {
			                file: Upload.dataUrltoBlob(dataUrl, name)
			            },
					}).then(function (response) {
			            $timeout(function () {
			                $scope.result = response.data;
			            });
			        }, function (response) {
			            if (response.status > 0) $scope.errorMsg = response.status 
			                + ': ' + response.data;
			        }, function (evt) {
			            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			        });
			    }



				/*
				var activeUserProfile = User.getProfile().then(function(response){
					var dataResponse = response.data;
					var profile = dataResponse;
				});

				User.getProfile().then(function(response){
					var dataResponse = response.data;
					$scope.profile = dataResponse;
				});
*/
			},
	        
			templateUrl: 'views/myaccount/profile.directive.html',
	  	};
	}

})();