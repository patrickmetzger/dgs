// public/js/services/UserService.js
angular.module('UserService', ['ngCookies','EmailService']);

angular.module('UserService').factory('User', user);
function user($rootScope, $http, $cookies, $location, $state, $q, userRoles, Email) {
    
    var loginState = false;

    var userById = function(id){
        return $http.get('/api/user/id/' + id);
    };

    var checkFollow = function(id){
        var userData = returnUserID(id);
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

    var checkBearerToken = function(state, ref, action){
        var activeSession = $cookies.get("token");
        if (activeSession){
            loginState = true;
        }else{
            // lets redirect to the login page with a redirect back to page.
            if (action){
                $state.go("login", { "state": state, "item": ref.item, "itemID": ref.itemID, "action": action});
            }else if (ref){
                $state.go("login", { "state": state, "item": ref.item, "itemID": ref.itemID});
            }else{
                $state.go("login");
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

    var returnUserID = function(id){

    }

    var logout = function(){

        $cookies.remove("token");

        $rootScope.showMenu = false;
        $rootScope.$broadcast('loginStateChange');

        $state.go('login'); // go to login
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
    };

    sendEmail = function(type, data){
        // pass welcome email to route
        Email.welcome(data);
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

        checkAccessToken: function(state, ref, action){
            return checkBearerToken(state, ref, action);
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

        sendWelcomeMail : function(data){
            return sendEmail('welcome', data);
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

        noAccess: function(){
            return logout();
        },

        buildProfile: function(){
            var buildingProfile = getUID().then(function(response){
                var uid = response.data;
                var thumb = '';
                var buidByID = userById(uid).then(function(response){
                    if (response.data.imgThumb){
                        // set to default image
                        thumb = response.data.imgThumb;
                    }else{
                        thumb = 'default_user.svg';
                    }
                    
                    var profile = {
                        'photo': thumb,
                        'fName': response.data.fName,
                        'lName': response.data.lName,
                        'fullName': response.data.fullName,
                        'email': response.data.email,
                        'zipCode': response.data.zipCode
                    }
                    return profile;
                })

                return buidByID;
                
            });

            return buildingProfile;
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