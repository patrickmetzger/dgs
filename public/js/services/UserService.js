// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/users');
        },

        checkEmail : function(email) {
            return $http.get('/api/users/' + email);
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(usersData) {
            return $http.post('/api/users', usersData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    }       

}]);