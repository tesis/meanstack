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
    srv.endpointUsernameSearch = '/api/searchContacts';
    // srv.endpointExactContact = '/api/exactContact';
    srv.endpointEmailUnique = '/api/getEmailContact';
    srv.endpointUsernameUnique = '/api/getUsernameContact';

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
      var endpoint = srv.endpoint + '/' + limit;
      if(skip !== undefined){
        endpoint += '/'+ skip ;
        // S('skip and limit defined ' + skip);
      }
      // A new instance of deferred
        var deferred = $q.defer();
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
        var deferred = $q.defer();
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
    srv.getUser = function(id){
        var deferred = $q.defer();
        $http.get('/api/userList/' + id)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound);
            }
          })
          /*.error(function (fallback) {
            deferred.reject(fallback);
          });*/

        return deferred.promise;
    }
    // search contacts by username, fname, lname, email, return username, id
    srv.searchContact = function(keyword){
        var deferred = $q.defer();
        $http.get(srv.endpointUsernameSearch + '/' + keyword)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound);
            }
          })
          .error(function (fallback) {
            deferred.reject(fallback);
          });

        return deferred.promise;
    }

    srv.searchExactContact = function(id){
        var deferred = $q.defer();
        $http.get(srv.endpointContacts + '/' + id)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound);
            }
          })
          .error(function (fallback) {
            deferred.reject(fallback);
          });

        return deferred.promise;
    }
    /*-------------------- CRUD ----------------------*/
    // id = contactId
    // obj = contact object

    srv.edit = srv.getContact;

    srv.create = function(obj){
      var deferred = $q.defer();
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
      var deferred = $q.defer();
      $http.put(srv.endpoint + '/' + obj._id, obj)
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
      var deferred = $q.defer();
      $http.delete(srv.endpoint + '/' + id)
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

    srv.unique = function(field, value, id){
      if (!id) id = 0;
      var def = $q.defer();
      var endpoint;

      if(field === 'email'){
        endpoint = srv.endpointEmailUnique;
      }
      if(field === 'username'){
        endpoint = srv.endpointUsernameUnique;
      }


      $http.get(endpoint + '/' + escape(value))
        // handle success
        .success(function (data, status) {
          // console.log(id + ' ' + data._id)
          if(status === 200 && data !== null){
            if(data._id === id){
              //console.log('on update - user has this email, no other: ' + id + data._id);
              def.resolve(field + ' valid ' +  + id + data._id);
            }
            else{
              def.reject(field + ' already exists ' +   id + data._id);
            }
          }
          else {
            def.resolve(field + 'status not 200, valid ' +  + id + data._id);
          }
        })
        // handle error
        .error(function (fallback) {
          //console.log(field + '-error')
          if(fallback === undefined || fallback === ''){
            fallback = field + '-error';
          }
          // deferred.reject - with or without reason
          def.resolve(fallback);
        });

      return def.promise;
    }

  }
})();
