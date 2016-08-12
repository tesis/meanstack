/**
 * tasks.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('TasksController',TasksController);

  TasksController.$inject = ['UsersService', 'TasksService','ContactsService', '$rootScope', '$routeParams','$location'];

  function TasksController(UsersService, TasksService, ContactsService, $rootScope, $routeParams, $location){
    var vm = this;
    vm.message = 'This is restricted area!';

    vm.currentPage = 1;
    vm.numPerPage = 10;

    vm.alerts = [];

    // on changeUser, assignedUsername = user from the list
    vm.assignedUser = vm.selectedUsername = $rootScope.username;
    vm.assignedUserId = $rootScope.userId;


    vm.master = {};
    // adding new task, we have empty object
    vm.taskNew = {};

    // Toggling
    vm.formShow = false;
    vm.detailsShow = false;
    vm.toggleLeft=false;
    vm.active = '';

    vm.userList = {};
    vm.userArr = [];
    // Form
    vm.openForm = function(){
      vm.formShow = true;
    }
    vm.closeForm = function(){
      vm.formShow = false;
      vm.taskNew = {};
      vm.selectedContact = '';
    }
    // Alerts
    vm.addAlert = function(type, message) {
      vm.alerts.push({type: type, msg: message});
    };
    vm.closeAlert = function(index) {
      vm.alerts.splice(0);
    };


    // Add contact
    vm.create = addTask;

    // Toggle Expand
    vm.showDetails = function(task, $event){
      vm.detailsShow = true;
      vm.task = task;
      vm.active = 'active';
      // get user and casework details
      getContact(task.contactId, vm.task);
    }
    vm.hideDetails = function(){
      vm.detailsShow = false;
    }

    // Routing
    if(!$routeParams.id || $location.path() !== "/CMS/task/create"){
      init();
      if($routeParams && $routeParams.id !== undefined){
        vm.assignedUserId = $routeParams.id;
        console.log('known userid')
      }
      // On page changed - list tasks by user for the new page
      vm.pageChanged = function() {
        vm.closeAlert();
        vm.detailsShow = false;
        // console.log(vm.assignedUserId + vm.assignedUser);
        // userList is already cached on page changed

        if(UsersService.userListArrLen === 0){
          angular.forEach(vm.userList, function(user) {
            if(user._id === userId){
              vm.selectedUsername = user.username;
            }
          });
        }
        listByUser(vm.assignedUserId);
     };


     // Using dropdown, on click, display data
     vm.userChanged = function(id, username){
      vm.formShow = false;
      vm.detailsShow = false;
      vm.tasks = listByUser(id);
      vm.assignedUser =  username;
      vm.assignedUserId = id;
      vm.selectedUsername = username;
      vm.currentPage = 1;
     }
    }
    // Dropdown for update/ create task
    vm.userAssign = function(id, username, task){
     vm.assignedUser = username;

     vm.assignedUserId = id;
     task.userId = id;
     task.userUsername = username;
    }
    // List tasks by user
    vm.taskListByUser = function(userId){
      listByUser(userId);
    }
    // Update task (also for reassigning the user)
    vm.updateUser = function(task, userId){
      vm.closeAlert();
      // Toggle user ids
      var user = task.userId;
      task.userId = userId;
      TasksService.update(task)
          .then(function(data){
            listByUser(user);
            vm.addAlert('success', data.msg);
          })
          .catch(function (fallback) {
            vm.addAlert('danger', fallback);
          });
    }

    // Search contact - when creating new task
    vm.searchContact = function(username){
      //remove error when searhing
      vm.form.selectedContact.$setValidity('contactExisting', true);
      ContactsService.searchContact(username)
        .then(function(data){
          if(data !== '' || data !== undefined){
            vm.contacts = data.docs;
            // console.log(data);
          }
        })
       .catch(function (fallback) {
          vm.addAlert('danger', fallback);
        });
    }
    vm.selectContact = function(contact, task){
      // console.log(contact);
      vm.form.selectedContact.$setValidity('contactExisting', true);
      vm.selectedContact = contact.username;
      vm.selectedContactId = contact._id;
      task.contactId = contact._id;
      task.contactUsername = contact.username;
      task.contactEmail = contact.email;
      vm.contacts = '';
    }


    // Update task status
    vm.updateTaskStatus = function(task){
      vm.closeAlert();

      taskUpdate(task, 'status')
    }

    vm.updateTaskDetails = function(task) {
      vm.closeAlert();
      if(task.details === ''){
        vm.addAlert('danger', 'Details are required');
        return false;
      }
      taskUpdate(task,'');
    };
    vm.dateChanged = function(task) {
      vm.closeAlert();
      if(task.dueDate === ''){
        // do nothing?
      }
      taskUpdate(task,'');
    };
    // Delete a task for user
    vm.remove = function(id, userId){
      // console.log(id + ' ' + userId)
      vm.closeAlert();
        TasksService.delete(id)
          .then(function(data){
            vm.addAlert('success', data);
            listByUser(userId);
            vm.detailsShow = false;
          })
         .catch(function (fallback) {
            vm.addAlert('danger', fallback);
          });
    }
    // Display list of users and tasks for logged in user
    function init(){
      vm.closeAlert();
      // get list of users with tasks and assign vm.assignedUserId
      // cannot be cached, as can be changed anytime
      UsersService.userList()
        .then(function(data){
          // console.log('user list 2')
          vm.userList = data;
          listByUser(vm.assignedUserId);
        })
       .catch(function (fallback) {
          vm.formShow = false;
          vm.addAlert('danger', fallback);
        });
    }
    /**
     * listByUser list of tasks by user on load
     * @access private
     */
    function listByUser(userId){
      // console.log(userId)
      // get username from userList
      if(UsersService.userListArrLen > 0){
        vm.selectedUsername = UsersService.userListArr[userId];
      }
      else{
        angular.forEach(vm.userList, function(user) {
          if(user._id === userId){
            vm.selectedUsername = user.username;
          }
        });
      }
      var skip = 0;
      if(vm.currentPage > 1){
        skip = (vm.currentPage - 1) * vm.numPerPage;
      }
      vm.closeAlert();
      TasksService.taskListByUser(userId, vm.numPerPage, skip)
          .then(function(data){
            vm.tasks = data.docs;
            vm.totalItems = data.count;
          })
         .catch(function (fallback) {
            vm.addAlert('danger', fallback);
          });
    }
    /**
     * getContact get contact details for specific task and
     *            append contactUsername we need in a list
     * @access private
     *
     * @param  string id contact id
     * @param  object d task
     */
    function getContact(id,d){
      vm.closeAlert();
      ContactsService.getContact(id,d)
        .then(function(data){
          if(data){
            d.contactUsername = data.username;
          }
          else{
            //TODO: remove task from records or flag it
          }
        })
       .catch(function (fallback) {
          vm.addAlert('danger', fallback);
        });
    }
    /**
     * addTask
     *
     */
    function addTask(){
      vm.closeAlert();

      // If userId is not defined (selected), task is assigned to
      // the current logged in user
      if(vm.taskNew.userId === undefined || vm.taskNew.userId === ''){
        vm.taskNew.userId = vm.assignedUserId;
      }
      // On submit - check if contact is valid (usually if not selected )
      ContactsService.searchExactContact(vm.taskNew.contactId)
        .then(function(data){
          // create task if contact exists
          TasksService.create(vm.taskNew)
            .then(function(data){

              vm.addAlert('success', data.msg + ' for ' + vm.taskNew.userUsername + ' regarding ' + vm.taskNew.contactUsername);
                /*if(vm.taskNew.sendEmail === true){
                  console.log('send email: ' + vm.taskNew.contactEmail);
                }*/

                $location.path('/CMS/tasks')
                // refresh the list if the user is assigned user
                // assignedUser = currently loggedIn user
                // selected user - new selected user for the task
                if(vm.assignedUser === vm.selectedUsername){
                  vm.detailsShow = true;
                  vm.task = vm.taskNew;
                  vm.task.taskStatus = 'uncompleted';
                  listByUser(data.userId);
                }
                // Close form and reset sent data
                vm.closeForm();
            })
           .catch(function (fallback) {
              vm.formShow = true;
              vm.addAlert('danger', fallback);
            });

        })
        .catch(function (fallback) {
          // vm.addAlert('danger', 'Contact does not exist');
          vm.form.selectedContact.$setValidity('contactExisting', false);
        });

    }
    /**
     * taskUpdate
     * @access private
     * @param  object task
     * @param  string status - optional (only when status needs to be updated)
     */
    function taskUpdate(task, status){
      TasksService.update(task, status)
          .then(function(data){
            vm.addAlert('success', data.msg);
          })
          .catch(function (fallback) {
            vm.addAlert('danger', fallback);
          });
    }

    /**
     * formReset reset form - not in use (will reset all forms)
     */
    function formReset(){
      if(vm.form){
        vm.form.$setPristine();
        vm.form.$setUntouched();
      }
      vm.task = angular.copy(vm.master);
    }
    /*---------------- DATEPICKER -------------------------*/
    // Open datepicker and on select, save date (vm.dateChanged)
    vm.open = function($event, task) {
      $event.preventDefault();
      $event.stopPropagation();

      task.isOpen = true;
    };

    // Open datepicker on the form (create/update)
    vm.opened = function($event, task) {
      if(task === undefined || task === ''){
        task = '';
        vm.isOpened = true;
      }
      else{
        vm.isOpened = true;
      }
      $event.preventDefault();
      $event.stopPropagation();

    };

    /*---------------- end vm ----------------*/
  }


})();
