/**
 * config.route.js
 */

(function() {
  'use strict';
  angular.module('app.tasks', ['ngRoute']);
  angular
    .module('app.tasks')
    .config(config)

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/CMS/tasks', {
        templateUrl: 'tasks/index',
        controller: 'TasksController',
        controllerAs: 'tCtrl',
        access: {restricted: true}
      })
      // not in use yet
      .when('/CMS/tasks/:id', {
        templateUrl: 'tasks/index',
        controller: 'TasksController',
        controllerAs: 'tCtrl',
        access: {restricted: true}
      })
      .when('/CMS/tasks/username', {
        templateUrl: 'tasks/index',
        controller: 'TasksController',
        controllerAs: 'tCtrl',
        access: {restricted: true}
      })
      // set formShow to true
      .when('/CMS/task/create', {
        templateUrl: 'tasks/form',
        controller: 'TasksController',
        controllerAs: 'tCtrl',
        access: {restricted: true}
      })
  }

})();
