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
    var srv = this;
    srv.endpoint = '/api/contactList';
    srv.endpointContacts = '/api/contacts';
    srv.msg = {
      notFound: " Record not found ",
      notUpdated: " Record not updated ",
      notSaved: " Record not saved ",
      notDeleted: " Record not deleted ",
      saved: " Record successfully saved ",
      updated: " Record successfully updated ",
      deleted: " Record successfully deleted ",
      empty: " List is empty ",
      generalErr: " An error occurred ",
    }

    srv.listContacts = function(limit, skip){
      let endpoint = srv.endpoint + '/' + limit;
      if(skip !== undefined){
        endpoint += '/'+ skip ;
        // console.log('skip and limit defined ' + skip);
      }
      // A new instance of deferred
        let deferred = $q.defer();
        // send a post request to the server
        $http.get(endpoint)
          // handle success
          .success(function (data, status) {
            if(status === 200){
              // data with docs and count
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.empty);
            }
          })
          // handle error
          .error(function (fallback) {
            if(fallback === '' || fallback === 'undefined'){
              fallback = srv.msg.generalErr;
            }
            deferred.reject(fallback);
          });

        // return promise object
        return deferred.promise;
    }

    srv.getContact = function(id){
        let deferred = $q.defer();
        $http.get(srv.endpointContacts + '/' + id)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound);
            }
          })

        return deferred.promise;
    }
    /*-------------------- CRUD ----------------------*/
    // id = contactId
    // obj = contact object

    srv.edit = srv.getContact;

    srv.create = function(obj){
      let deferred = $q.defer();
      $http.post(srv.endpoint , obj)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject(srv.msg.notSaved);
          }
        })
        .error(function (fallback) {
          deferred.reject(fallback);
        });

      return deferred.promise;
    }
    srv.update = function(obj){
      let deferred = $q.defer();
      $http.put(srv.endpoint + '/'+obj._id, obj)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject(srv.msg.notSaved);
          }
        })
        .error(function (fallback) {
          deferred.reject(fallback);
        });

      return deferred.promise;
    }
    srv.delete = function(id){
      let deferred = $q.defer();
      $http.delete(srv.endpoint + '/'+id)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject(srv.msg.notDeleted);
          }
        })
        .error(function (fallback) {
          deferred.reject(fallback);
        });

      return deferred.promise;
    }

  }
})();
