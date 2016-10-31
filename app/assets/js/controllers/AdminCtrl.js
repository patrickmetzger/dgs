(function () {
    'use strict';

    angular.module('Admin', ['AdminServices', 'UserService', 'CatService', 'AccountService']);

    angular.module('Admin').controller('AdminCtrl', adminIndex);
    function adminIndex($scope, $http, $state, $rootScope, User, category, accountInfo) {
        checkSecurity($state, User);
        $scope.title = 'My Account';

    }

    angular.module('Admin').controller('AdminCatsCtrl', adminCats);
    function adminCats($scope, $http, $location, $rootScope, User, category, accountInfo, adminCatsFactory) {
    
        $scope.title = 'Categories';

    }
    
    angular.module('Admin').controller('AdminUsersCtrl', adminUsers);
    function adminUsers($scope, $http, $location, $rootScope, User, category, accountInfo) {
    
        $scope.title = 'Users';

    }

})();
