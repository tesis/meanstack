/**
 * auth.service.js
 *
 * authorization service with interceptors
 *
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .service('AuthService', authService)
    .service('authInterceptor', authInterceptor)

  // AuthService
  authService.$inject = ['$q', '$http', '$window'];

  function authService($q, $http, $window) {

      // Helper functions
      function getToken(){
        return $window.localStorage['cms-token'];
      }
      function saveToken(token){
        $window.localStorage['cms-token'] = token;
      }
      function parseJwt(token) {
        token = token.split('.')[1];
        token = token.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(token));
      }

      this.isLoggedIn = function(){
        var token = getToken();
        if(token && token !== 'undefined'){
          // error - if login or register failed:
          var payload = parseJwt(token);

          return payload.exp > Math.round(Date.now() / 1000);
        }
        else {
          return false;
        }
      }

      this.currentUser = function(){
        if(this.isLoggedIn()){
          var token = getToken();
          var payload = parseJwt(token);

          return payload.username;
        }
      }

      // Login
      this.login = function (username, password) {

        // A new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/api/signin',
          {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              saveToken(data.token);
              deferred.resolve();
            }
          })
          // handle error
          .error(function (fallback) {
            // deferred.reject - with or without reason
            deferred.reject(fallback);
            $window.localStorage.removeItem('cms-token');
          });

        // return promise object
        return deferred.promise;

      }

      // Register
      this.register = function(username, password) {

        var deferred = $q.defer();

        $http.post('/api/signup',
          {username: username, password: password})
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            }
            else {
              deferred.reject("User already exists!");
            }
          })
          .error(function (fallback) {
            deferred.reject(fallback);
          });

        return deferred.promise;

      }

      // Logout
      this.logout = function() {

        var deferred = $q.defer();

        $http.get('/api/logout')
          .success(function (data) {
            $window.localStorage.removeItem('cms-token');
            deferred.resolve();
          })
          .error(function (data) {
            deferred.reject("Not logged out. Please try again or contact administrator");
          });

        return deferred.promise;

      }

  }

  // Interceptor
  authInterceptor.$inject = ['$q'];

  function authInterceptor($q) {

      this.request = function(config) {
        return config;
      }

     this.requestError = function(rejection) {
        return $q.reject(rejection);
      }

      this.response = function(response) {
        return response;
      }

     this.responseError = function(rejection) {
        return $q.reject(rejection);
      }

  }

})();




