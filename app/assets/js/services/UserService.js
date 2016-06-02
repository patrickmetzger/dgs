// public/js/services/UserService.js

angular.module('UserService', [
    'ngCookies'
]);

angular.module('UserService')
    .factory('User', user);

    function user($rootScope, $http, $cookies, $location, $route) {

        var loginState = false;

        var checkBearerToken = function(ref, action){
            var activeSession = $cookies.getObject("dgsUserAuth");
            if (activeSession){
                loginState = true;
            }else{
                // lets redirect to the login page with a redirect back to page.
                if (action != ''){
                    $location.path('/login').search({'ref': ref, 'action': action});    
                }else{
                    $location.path('/login').search('ref', ref);
                }
            }
            return loginState;
        };

        var activeUserProfile = function(){
            if (checkBearerToken()){
                var activeSession = $cookies.getObject("dgsUserAuth");
                return $http.get('/api/user/' + activeSession.token);
            }
        }

        var userWishList = function(uID){
            return $http.get('/api/wishlist' + uID);
        }

        var userWatchList = function(uID){
            return $http.get('/api/watchlist' + uID);
        }

        var getUID = function(){
            var activeSession = $cookies.getObject("dgsUserAuth");
            if (activeSession){
                return activeSession.token;
            }else{
                return undefined;
            }
            
        }

        var returnUserID = function(){
            //if (checkBearerToken()){
                var activeSession = $cookies.getObject("dgsUserAuth");
                return activeSession;
            //}
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
            getWatchList : function(uID){
                return userWatchList(uID);
            },

            getUserId : function(){
                return returnUserID();
            },

            checkAccessToken: function(ref, action){
                return checkBearerToken(ref, action);
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