(function() {
	'use strict';

	angular.module('dgs').directive("header", header);

	function header(){
		return{
			templateUrl: '/incs/header.html'
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