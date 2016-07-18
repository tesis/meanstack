/**
 * auth.directive.js
 *
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .directive('equalTo', equalTo)
    .directive("username", username)
    .directive("email", checkEmail)

  function equalTo(){
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        // Check if attribute exists
        if (!attrs.equalTo) {
          return;
        }
        scope.$watch(attrs.equalTo, function (value) {
          if( value === ctrl.$viewValue && value !== undefined) {
           ctrl.$setValidity('equalTo', true);
           ctrl.$setValidity("parse",false);
         }
         else {
           ctrl.$setValidity('equalTo', false);
         }
       });
        ctrl.$parsers.push(function (value) {
          var isValid = value === scope.$eval(attrs.equalTo);
          ctrl.$setValidity('equalTo', isValid);
          return isValid ? value : false;
        });
      }
    };
  }
  function username($q, $timeout, $http) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var usernames = [];

        ctrl.$asyncValidators.username = function(modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.when();
          }

          var def = $q.defer();

          $timeout(function() {
            $http.get('/api/checkUsernameAuth/' + modelValue)
              // handle success
              .success(function (data, status) {
                if(status === 200 && data !== null){
                  def.reject();
                }
                else {
                  def.resolve();
                }
              })
              // handle error
              .error(function (fallback) {
                // deferred.reject - with or without reason
                def.resolve(fallback);
              });

          }, 300);

          return def.promise;
        };
      }
    };
  }

  function checkEmail($q, $timeout, $http) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.emailExists = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.when();
          }

          var def = $q.defer();

          $timeout(function() {
            $http.get('/api/checkEmailAuth/' + modelValue)
              // handle success
              .success(function (data, status) {
                if(status === 200 && data !== null){
                  def.reject();
                }
                else {
                  def.resolve();
                }
              })
              // handle error
              .error(function (fallback) {
                // deferred.reject - with or without reason
                def.resolve(fallback);
              });

          }, 300);

          return def.promise;
        };
      }
    };
  }

})();

