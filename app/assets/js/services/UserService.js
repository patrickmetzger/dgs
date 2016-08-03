// public/js/services/UserService.js

angular.module('UserService', [
    'ngCookies'
]);

angular.module('UserService')
    .factory('User', user);

    function user($rootScope, $http, $cookies, $location, $route, $q) {

        var loginState = false;

        var userById = function(id){
            return $http.get('/api/user/id/' + id).then(function(response) {    
              return response.data;
            });
        };

        var checkFollow = function(id){
            var userData = returnUserID();
            if (userData){
                
                return $http.get('/api/user/follow/' + userData.token + '/' + id).then(function(response){
                    var followingData = response.data;
                    return followingData;
                });
            }else{
                return undefined;   
            }
            return checkFollow;
        };

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

        var followUser = function(itemID, action){
            var userData = returnUserID();
            if (userData){
                // add to users wishlist
                var data = {
                    'userID' : userData.token,
                    'itemID' : itemID,
                    'action' : action
                };

                $http.post('/api/user/follow', data).then(function(success){
                    return success;
                });
            }
        }

        return {
            getUserByID : function(id){
                return userById(id);
            },

            getWatchList : function(uID){
                return userWatchList(uID);
            },

            getUserId : function(){
                return returnUserID();
            },

            checkAccessToken: function(ref, action){
                return checkBearerToken(ref, action);
            },

            // call to get all users
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
            },

            checkIfFollow: function(userID){
                return checkFollow(userID);
            },

            follow: function(id, action){
                return followUser(id, action);
            }
            
        }       

    };