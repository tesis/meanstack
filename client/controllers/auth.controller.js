/**
 * auth.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('loginController', loginController)
    .controller('registerController', registerController)
    .controller('logoutController', logoutController)

  // Login Controller
  loginController.$inject = ['$location', 'AuthService', '$timeout'];

  function loginController($location, AuthService, $timeout) {
      var vm = this;
      vm.isValid = false;
      vm.error = false;
      vm.errorMessage = "";

      // function to submit the form after all validation has occurred
      vm.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
          vm.isValid = true;
        }
        if(vm.isValid === true){
          signin();
        }
        else{
          vm.error = true;
          vm.errorMessage = "All fields are required";
        }
      };

      function signin() {

        // initial values
        vm.error = false;
        vm.errorMessage = "";

        // call login from service
        AuthService.login(vm.user.username, vm.user.password)
          // handle success
          .then(function () {
            vm.success = true;
            vm.successMessage = "Successfully logged in";
            $timeout(function() {
              $location.path('/');
              }, 2000);
          })
          // handle error
          .catch(function (fallback) {
            vm.error = true;
            vm.errorMessage = fallback;
          });
      };
  }

  // Register Controller
  registerController.$inject = ['$location', 'AuthService', '$timeout'];

  function registerController($location, AuthService, $timeout) {
      var vm = this;

      vm.isValid = false;
      vm.error = false;
      vm.errorMessage = "";

      // function to submit the form after all validation has occurred
      vm.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
          console.info('form valid');
          vm.isValid = true;
        }
        if(vm.isValid === true){
          signup();
        }
        else{
          vm.error = true;
          vm.errorMessage = "All fields are required";
        }
      };

      function signup() {
        // initial values
        vm.error = false;
        vm.success = false;
        var username = vm.user.username;
        var password = vm.user.password;

        // call register from service
        AuthService.register(username, password)
          // handle success
          .then(function () {
            vm.success = true;
            vm.successMessage = "Registrations successful.You'll get confirmation email soon and you can proceed with login";
            $timeout(function() {
              $location.path('/login');
              }, 5000);
          })
          // Catch error
          .catch(function (fallback) {
            vm.error = true;
            vm.errorMessage = fallback;
          });

      };

  }

  // Logout Controller
  logoutController.$inject = ['$location', 'AuthService'];

  function logoutController($location, AuthService) {
      var vm = this;
      vm.logout = function () {
        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/');
          });
      };
  }

})();
