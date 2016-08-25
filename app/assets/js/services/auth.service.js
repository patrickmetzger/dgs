(function () {
    'use strict';

    angular.module('dgs.authService', []);
  
    angular
        .module('dgs.authService')
        .service('AuthService', auth);

        function auth($q, $cookies, $http, userRoles){
          var username = '';
          var isAuthenticated = false;
          var role = '';
          var authToken;
         
          function loadUserCredentials() {
            var token = $cookies.get('token');
            if (token) {
              useCredentials(token);
            }
          }
         
          function storeUserCredentials(token) {
            useCredentials(token);
          }
         
          function useCredentials(token) {
            username = token.split('.')[0];
            isAuthenticated = true;
            authToken = token;
         
            if (username == 'admin') {
              role = userRoles.admin
            }
            if (username == 'user') {
              role = userRoles.user
            }
         
            // Set the token as header for your requests!
            $http.defaults.headers.common['X-Auth-Token'] = token;
          }
         
          function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            $cookies.delete('token');
          }
         
          var login = function(name, pw) {
            return $q(function(resolve, reject) {
              if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
                // Make a request and receive your auth token from your server
                storeUserCredentials(name + '.yourServerToken');
                resolve('Login success.');
              } else {
                reject('Login Failed.');
              }
            });
          };
         
          var logout = function() {
            destroyUserCredentials();
          };
         
          var isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
              authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
          };
         
          loadUserCredentials();
         
          return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function() {
              return isAuthenticated;
            },
            username: function() {
              return username;
            },
            role: function() {
              return role;
            }
          };
        }

    angular
      .module('dgs.authService').factory('AuthInterceptor', 
        function ($rootScope, $q, authEvents) {
        return {
          responseError: function (response) {
            $rootScope.$broadcast({
              401: authEvents.notAuthenticated,
              403: authEvents.notAuthorized
            }[response.status], response);
            return $q.reject(response);
          }
        }
      });


    angular.module('dgs.authService').config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

})();