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

  // AuthService
  authService.$inject = ['$q', '$http', '$window'];

  function authService($q, $http, $window) {
    var messages = {
      userExists: "User already exists!",
      errNotLoggedOut: "Not logged out. Please try again or contact administrator",
      errGeneral: "An error occurred",
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
            deferred.reject(messages.userExists);
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
          deferred.reject(messages.errNotLoggedOut);
        });

      return deferred.promise;

    }

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
  }

})();




