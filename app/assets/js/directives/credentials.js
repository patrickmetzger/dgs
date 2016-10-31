(function () {
    'use strict';

    angular.module('dgs').directive("patternValidator", patternValidator);
      function patternValidator() {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function(scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {             
              if (viewValue && viewValue.length != 0){
                var patt = new RegExp(attrs.patternValidator);           
                var isValid = patt.test(viewValue);
                ctrl.$setValidity('passwordPattern', isValid);
              }else{
                ctrl.$setValidity('passwordPattern', isValid);
              }
              
              // angular does this with all validators -> return isValid ? viewValue : undefined;
              // But it means that the ng-model will have a value of undefined
              // So just return viewValue!
              return viewValue;
            });
          }
        };
    };

  })();