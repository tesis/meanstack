/**
 * contacts.service.js
 *
 * no globals
 */

(function() {

  'use strict';
  angular
    .module('myApp')
    .service('ContactsService',  contactsService)

  contactsService.$inject = ['$q', '$http'];

  function contactsService($q, $http) {

    this.refresh = function(){
      // A new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.get('/api/contactList')
          // handle success
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject('Contacts Not found');
            }
          })
          // handle error
          .error(function (data, status) {
            // deferred.reject - with or without reason
            deferred.reject('Contacts.error');
          });

        // return promise object
        return deferred.promise;
    }

    this.editContact = function(contactId){
        var deferred = $q.defer();
        $http.get('/api/contactList/' + contactId)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject('Contact Not found' + contactId);
            }
          })
          .error(function (data, status) {
            deferred.reject('Contact not found ' + contactId);
          });

        return deferred.promise;
    }
    this.addContact = function(contact){
      var deferred = $q.defer();
      $http.post('/api/contactList', contact)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject('Contact Not saved');
          }
        })
        .error(function (data, status) {
          deferred.reject('Contact not saved error');
        });

      return deferred.promise;
    }
    this.updateContact = function(contactId, contact){
      var deferred = $q.defer();
      $http.put('/api/contactList/'+contactId, contact)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject('Contact Not updated' + contactId);
          }
        })
        .error(function (data, status) {
          deferred.reject('Contact not updated error');
        });

      return deferred.promise;
    }
    this.deleteContact = function(contactId){
      var deferred = $q.defer();
      $http.delete('/api/contactList/'+contactId)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject('Contact Not deleted' + contactId);
          }
        })
        .error(function (data, status) {
          deferred.reject('Contact not deleted error');
        });

      return deferred.promise;
    }

  }
})();
