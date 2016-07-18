/**
 * dashboard.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('DashboardController', dashboardController);

  dashboardController.$inject = ['$http', 'UsersService', 'TasksService', '$rootScope'];

  function dashboardController($http, UsersService, TasksService, $rootScope){
    var vm = this;
    vm.message = 'This is restrict area!';
    vm.page = "cms";
    // vm.tasks = {};

    vm.currentPage = 1;
    vm.numPerPage = 5;

    init();

    vm.taskListByUser = function(userId){
      // find tasks by user
      listByUser(userId);
    }

    // Display list of users and tasks for logged in user
    function init(){
      UsersService.userList()
        .then(function(data){
          vm.userList = data;
          angular.forEach(data, function(d, i){
            if(d.username === $rootScope.username){
              vm.userSelect = data[i];
              vm.tasks = listByUser(data[i]._id);
            }
          });
        })
       .catch(function (fallback) {
          vm.formShow = false;
          vm.error = true;
          vm.errorMessage = fallback;
        });
    }

    // Paginate results
    vm.paginate = function (value) {
      var begin, end, index;
      begin = (vm.currentPage - 1) * vm.numPerPage;
      end = begin + vm.numPerPage;
      index = vm.tasks.indexOf(value);
      return (begin <= index && index < end);
    };

    function listByUser(userId){
      TasksService.taskListByUser(userId)
          .then(function(data){
            vm.tasks = data;
            vm.formShow = true;
            vm.btnShow = true;
            vm.totalItems = vm.tasks.length;
          })
         .catch(function (fallback) {
          console.log('empty data')
            vm.formShow = false;
            vm.error = true;
            vm.errorMessage = fallback;
          });
    }
  }

})();
