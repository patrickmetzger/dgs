// public/js/services/UserService.js
angular.module('UserService', [
    'ngCookies'
]);


angular.module('UserService')
    .factory('User', user);

    
    function user($rootScope, $http, $cookies, $location, $route, $q, userRoles) {
        
        var loginState = false;

        var userById = function(id){
            return $http.get('/api/user/id/' + id);
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

        var getBearToken = function(){
            var beartoken = $cookies.get("token");
            return beartoken;
        };

        var checkBearerToken = function(ref, action){
            var activeSession = $cookies.get("token");
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
            if (UserObject.email){
                return buildUser();
            }else{
                return UserObject;
            }
       }

        var getUID = function(){
            if (checkBearerToken()){
                return $http.get('/api/userid');
            }else{
                return undefined;
            }
            
        }

        var returnUserID = function(){
            
            
        }

        var logout = function(){

            $cookies.remove("token");

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
        };

        var buildUser = function(){
            // get user id to build user
            var userID = $http.get('/api/userid');

            var userData = userID.then(function(response){
                userById(response.data).then(function(userData){
                    return userData.data;
                });
            });


            return userData;

        };

        updateImgThumb = function(name){
            // get uid and update users data
            return getUID().then(function (response) {
                var usersData = {
                    '_id': response.data,
                    'imgThumb': name
                }
                
                $http.post('/api/user', usersData);
            });           
        };

        saveUser = function(data){
            return $http.post('/api/user', data);
        }


        return {
            updateThumb : function(name){
                return updateImgThumb(name);
            },
            createUser : function(){
                return buildUser();
            },

            getUserByID : function(id){
                return userById(id);
            },

            getWatchList : function(uID){
                return userWatchList(uID);
            },

            getUserId : function(){
                return getUID();
            },

            getToken: function(){
                return getBearToken();
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
                return saveUser(usersData);
            },

            // call to DELETE a nerd
            delete : function(id) {
                return $http.delete('/api/user/' + id);
            },

            authenticate : function(loginData){
                return $http.post('/api/authenticate', loginData);
            },

            checkLogin: function() {
                if ($cookies.get("token")){
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