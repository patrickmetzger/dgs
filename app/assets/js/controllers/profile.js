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