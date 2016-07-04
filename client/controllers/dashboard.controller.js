/**
 * dashboard.controller.js
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('DashboardController', dashboardController);

  function dashboardController(){
    var instance = this;
    instance.message = 'This is restrict area!';
    instance.page = "cms";
  }

})();
