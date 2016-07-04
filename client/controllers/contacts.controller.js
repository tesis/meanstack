/**
 * contacts.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('ContactsController', contactsController);

  contactsController.$inject = ['$http', 'ContactsService'];

  function contactsController($http, CMSService){
      var vm = this;

      vm.formShow = false;

      vm.currentPage = 1;
      vm.numPerPage = 10;

      // Initialize a list
      refresh();

      function refresh(){
        CMSService.refresh()
          .then(function(data){
            vm.contactList = data;
            vm.totalItems = vm.contactList.length;

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
        index = vm.contactList.indexOf(value);
        return (begin <= index && index < end);
      };

      vm.edit = function(id){

        CMSService.editContact(id)
          .then(function(data){
            vm.contact = data;
            vm.formShow = true;
            vm.btnShow = true;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.error = true;
            vm.errorMessage = fallback;
          });
      }
      // Add contact
      vm.addContact = function(){
        CMSService.addContact(vm.contact)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.error = true;
            vm.errorMessage = fallback;
          });
      }
      
      // Update contact
      vm.update = function(){
        CMSService.updateContact(vm.contact._id, vm.contact)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.error = true;
            vm.errorMessage = fallback;
          });
      }
      
      // Remove contact
      vm.remove = function(id){
        CMSService.deleteContact(id)
          .then(function(data){
            vm.formShow = false;
            vm.btnShow = false;
            refresh();
          })
         .catch(function (fallback) {
            vm.formShow = false;
            vm.error = true;
            vm.errorMessage = fallback;
          });
      }
      // Sorting results
      vm.sort = function(keyname){
        vm.sortKey = keyname;
        vm.reverse = !vm.reverse;
      }
    }

})();
