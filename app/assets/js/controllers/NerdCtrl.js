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