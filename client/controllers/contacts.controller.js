/**
 * contacts.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('ContactsController', contactsController);

  contactsController.$inject = ['$http', '$routeParams', 'ContactsService', 'TasksService'];

  function contactsController($http, $routeParams, ContactsService, TasksService){
      var vm = this;

      vm.master = {};
      vm.formShow = false;

      vm.currentPage = 1;
      vm.numPerPage = 5;
      vm.alerts = [];

      // Form manipulation
      vm.openForm = function(){
        vm.formShow = true;
        vm.btnShow = false;
        formReset();
      }
      vm.closeForm = function(){
        vm.formShow = false;
        vm.btnShow = false;
        formReset();
      }

      // Alerts
      vm.addAlert = function(type, message) {
        vm.alerts.push({type: type, msg: message});
      };
      vm.closeAlert = function(index) {
        vm.alerts.splice(0);
      };

      // Routing
      if(!$routeParams.id){
        vm.numPerPage = 10;
        refresh();

        vm.pageChanged = function() {
          listContacts();
        };
      }
      else{
        //find all details about the contact
        findContact($routeParams.id, false);
        vm.pageChanged = function() {
          getTasksByContact($routeParams.id);
        };
      }
      // Change/update task status
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
      // Edit contact - find a contact and display a form
      vm.edit = function(id){
        findContact(id, true);
      }
      // Remove contact - confirm service added to views
      vm.remove = function(id){
        vm.closeAlert();
        ContactsService.delete(id)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = true;
            vm.addAlert('error', fallback);
          });
      }

      // For add or update contact, data are passed with ng-model
      // Add contact
      vm.create = addContact;
      // Update contact
      vm.update = updateContact;
      // Sorting results
      vm.sort = function(keyname){
        vm.sortKey = keyname;
        vm.reverse = !vm.reverse;
      }
      /**
       * refresh list
       */
      function refresh(){
        listContacts();
      }
      /**
       * formReset reset form
       */
      function formReset(){
        if(vm.form){
          vm.form.$setPristine();
          vm.form.$setUntouched();
        }
        vm.contact = angular.copy(vm.master);
      }

      /**
       * findContact
       *
       * @param  string contactId
       * @param  bool refresh
       */
      function findContact(contactId, refresh){
        vm.closeAlert();
        ContactsService.edit(contactId)
          .then(function(data){
            vm.contact = data;
            if(refresh !== 'undefined' && refresh === true){
              vm.formShow = true;
              vm.btnShow = true;
            }
            else{
              getTasksByContact(contactId);
            }
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.addAlert('error', fallback);
          });
      }
      /**
       * updateContact
       *
       */
      function updateContact(){
        vm.closeAlert();
        ContactsService.update(vm.contact)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.addAlert('error', fallback);
          });
      }
      /**
       * addContact
       */
      function addContact(){
        vm.closeAlert();
        ContactsService.create(vm.contact)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = true;
            vm.addAlert('error', fallback);
          });
      }
      /**
       * getTasksByContact
       *
       * @param  string contactId
       */
      function getTasksByContact(contactId){
        vm.closeAlert();
        let skip = 0;
        if(vm.currentPage > 1){
          skip = (vm.currentPage - 1) * vm.numPerPage;
        }
        TasksService.taskListByContact(contactId, vm.numPerPage, skip)
            .then(function(data){
              vm.tasks = data.docs;
              vm.totalItems = data.count;
            })
           .catch(function (fallback) {
              vm.addAlert('error', fallback);
            });
      }
      /**
       * listContacts - list of contacts with pagination
       *
       * @param  string contactId
       */
      function listContacts() {
        vm.closeAlert();
        let skip = 0;
          if(vm.currentPage > 1){
            skip = (vm.currentPage - 1) * vm.numPerPage;
          }
          ContactsService.listContacts(vm.numPerPage, skip)
            .then(function(data){
              vm.contactList = data.docs;
              vm.totalItems = data.count;
            })
           .catch(function (fallback) {
              vm.formShow = false;
              vm.addAlert('error', fallback);
            });
      }

      //------------ end controller
    }


})();
