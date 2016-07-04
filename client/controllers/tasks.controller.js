/**
 * tasks.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('TasksController',tasksController);

  function tasksController(){
    var instance = this;
    instance.message = 'This is restrict area!';
    instance.page = "cms";
  }

})();