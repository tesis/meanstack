/**
 * contacts.service.js
 *
 * no globals
 */

(function() {

  'use strict';
  angular
    .module('myApp')
    .service('TasksService',  TasksService)

  TasksService.$inject = ['$q', '$http'];

  function TasksService($q, $http) {
    var srv = this;
    srv.endpoint = '/api/taskList';
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
    // not in use for now
    srv.listTasks = function(){
      // A new instance of deferred
        let deferred = $q.defer();
        // send a post request to the server
        $http.get(srv.endpoint)
          // handle success
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound);
            }
          })
          // handle error
          .error(function (data, status) {
            // deferred.reject - with or without reason
            deferred.reject(srv.msg.notFound);
          });

        // return promise object
        return deferred.promise;
    }
    // Tasks by user
    srv.taskListByUser = function(userId, limit, skip){
        let deferred = $q.defer();
        let endpoint = srv.endpoint +'/' + userId + '/user/' + limit;
        if(skip !== undefined && limit !== undefined){
          endpoint +=  '/' + skip;
          // console.log('skip and limit defined');
        }
        $http.get(endpoint)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound + userId);
            }
          })
          .error(function (data, status) {
            deferred.reject(srv.msg.notFound + userId);
          });

        return deferred.promise;
    }

    srv.taskListByContact = function(contactId, limit, skip){
        let endpoint = srv.endpoint + '/' + contactId + '/contact/' + limit;
        if(skip !== undefined ){
          endpoint +=  '/' + skip;
          // console.log('skip and limit defined');
        }

        var deferred = $q.defer();
        $http.get(endpoint)
          .success(function (data, status) {
            if(status === 200){
              deferred.resolve(data);
            }
            else {
              deferred.reject(srv.msg.notFound + contactId);
            }
          })
          .error(function (data, status) {
            deferred.reject(srv.msg.notFound + contactId);
          });

        return deferred.promise;
    }
    /*----------------- CRUD ---------------*/
    // id is taskId
    // obj is task object
    srv.edit = function(id){
      let deferred = $q.defer();
      $http.get(srv.endpoint + '/' + id)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject(srv.msg.notFound + id);
          }
        })
        .error(function (data, status) {
          deferred.reject(srv.msg.notFound + id);
        });

      return deferred.promise;
    }
    srv.create = function(obj){
      let deferred = $q.defer();
      $http.post(srv.endpoint, obj)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve(data);
          }
          else {
            deferred.reject(srv.msg.notSaved);
          }
        })
        .error(function (data, status) {
          deferred.reject(srv.msg.notSaved);
        });

      return deferred.promise;
    }
    srv.update = function(obj, field){
      if(field !== 'undefined' && field === 'status'){
        obj = updateStatus(obj);
      }
      let deferred = $q.defer();
      $http.put(srv.endpoint + '/'+ obj._id, obj)
        .success(function (data, status) {
          if(status === 200){
            deferred.resolve({msg:srv.msg.updated});
          }
          else {
            deferred.reject(srv.msg.notUpdated + obj._id);
          }
        })
        .error(function (data, status) {
          deferred.reject(srv.msg.notUpdated);
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
            deferred.reject(srv.msg.notDeleted + id);
          }
        })
        .error(function (data, status) {
          deferred.reject(srv.msg.notDeleted);
        });

      return deferred.promise;
    }

    // toggle status and push to object
    function updateStatus(obj){
      if (obj.taskStatus === 'uncompleted') {
        obj.taskStatus = 'completed';
      }
      else if (obj.taskStatus === 'completed') {
        obj.taskStatus = 'uncompleted';
      }
      else {
        obj.taskStatus = 'uncompleted';
      }
      return obj;
    }
  }
})();
