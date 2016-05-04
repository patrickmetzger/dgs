// public/js/services/UserService.js

angular.module('UserService', [
    'ngCookies'
]);

angular.module('UserService')
    .factory('User', user);

    function user($rootScope, $http, $cookies, $location, $route) {

        var loginState = false;

        var checkBearerToken = function(){
            var activeSession = $cookies.getObject("dgsUserAuth");
            if (activeSession){
                loginState = true;
                return true;
            }
        };

        var activeUserProfile = function(){
            if (checkBearerToken()){
                var activeSession = $cookies.getObject("dgsUserAuth");
                return $http.get('/api/user/' + activeSession.token);
            }
        }

        var logout = function(){
            if ($cookies.getObject("dgsUserAuth")){
                $cookies.remove("dgsUserAuth");
            }
            
            $rootScope.showMenu = false;
            $rootScope.$broadcast('loginStateChange');

            $location.path('/login');
            $route.reload();
        };

        return {

            checkAccessToken: function(){
                return checkBearerToken();
            },

            // call to get all nerds
            get : function() {
                return $http.get('/api/user');
            },

            checkEmail : function(email) {
                return $http.get('/api/users/' + email);
            },

            // these will work when more API routes are defined on the Node side of things
            // call to POST and create a new nerd
            create : function(usersData) {
                return $http.post('/api/user', usersData);
            },

            // call to DELETE a nerd
            delete : function(id) {
                return $http.delete('/api/user/' + id);
            },

            authenticate : function(loginData){
                return $http.post('/api/authenticate', loginData);
            },

            checkLogin: function() {
                if ($cookies.getObject("dgsUserAuth")){
                    loginState = true;
                }else{
                    loginState = false;
                };
                return loginState;
            },

            doLogout: function($scope){
                return function() {
                    logout($scope);
                };
            },

            getProfile: function(){
                return activeUserProfile();
            }
        }       

    };