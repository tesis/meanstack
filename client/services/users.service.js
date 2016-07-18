/**
 * users.service.js
 *
 * no globals
 */

(function() {

  'use strict';
  angular
    .module('myApp')
    .service('UsersService',  usersService)

  usersService.$inject = ['$q', '$http'];

  function usersService($q, $http) {

    this.userList = function(){
      // A new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.get('/api/userList')
          // handle success
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject('Users Not found');
            }
          })
          // handle error
          .error(function (fallback) {
            deferred.reject('Users.error');
          });

        // return promise object
        return deferred.promise;
    }

    this.getUser = function(userId){
        var deferred = $q.defer();
        $http.get('/api/userList/' + userId)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject('User Not found' + userId);
            }
          })
          .error(function (fallback) {
            deferred.reject('User not found ' + userId);
          });

        return deferred.promise;
    }

  }
})();
