/**
 * tasks.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('TasksController',tasksController);

  tasksController.$inject = ['$http', 'UsersService', 'TasksService','ContactsService', '$rootScope', '$routeParams'];

  function tasksController($http, UsersService, TasksService, ContactsService, $rootScope, $routeParams){
    var vm = this;
    vm.message = 'This is restricted area!';
    vm.page = "cms";

    vm.currentPage = 1;
    vm.numPerPage = 5;

    vm.alerts = [];

    // Alerts
    vm.addAlert = function(type, message) {
      vm.alerts.push({type: type, msg: message});
    };
    vm.closeAlert = function(index) {
      vm.alerts.splice(0);
    };

    // Routing
    if(!$routeParams.id){
      init();
      // On page changed - list tasks by user for the new page
      vm.pageChanged = function() {
        vm.closeAlert();

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
          vm.addAlert('error', fallback);
        });
     };
    }

    // List tasks by user
    vm.taskListByUser = function(userId){
      console.log('vm tasks by user')

      listByUser(userId);
    }

    // Update task status
    vm.updateTaskStatus = function(task){
      vm.closeAlert();

      TasksService.update(task, 'status')
          .then(function(data){
            vm.addAlert('success', data.msg);
          })
          .catch(function (fallback) {
            vm.addAlert('error', fallback);
          });
    }

    // Display list of users and tasks for logged in user
    function init(){
      vm.closeAlert();
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
          vm.addAlert('error', fallback);
        });
    }
    // List tasks by user on load
    function listByUser(userId){
      let skip = 0;
      if(vm.currentPage > 1){
        skip = (vm.currentPage - 1) * vm.numPerPage;
      }
      vm.closeAlert();
      TasksService.taskListByUser(userId, vm.numPerPage, skip)
          .then(function(data){
            vm.tasks = data.docs;
            vm.formShow = true;
            vm.btnShow = true;
            vm.totalItems = data.count;
            // Get contact username
            angular.forEach(data.docs, function(d){
              vm.getContact(d.contactId, d);
            });
            // re-assign tasks with new data
            vm.tasks = data.docs;
            // console.log(vm.tasks);
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.addAlert('error', fallback);
          });
    }

    vm.getContact = function(id,d){
        vm.closeAlert();
        ContactsService.getContact(id,d)
          .then(function(data){
            if(data){
              d.contact = data.username;
            }
            else{
              //TODO: remove task from records or flag it
            }
          })
         .catch(function (fallback) {
            vm.addAlert('error', fallback);
          });
      }
  }


})();
