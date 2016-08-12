/**
 * config.route.js
 */

(function() {
  'use strict';
  angular.module('app.contacts', ['ngRoute']);
  angular
    .module('app.contacts')
    .config(config)

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/CMS/contacts', {
        templateUrl: 'contacts/index',
        controller: 'ContactsController',
        controllerAs: 'cCtrl',
        access: {restricted: true}
      })
      //get a contact by id - list tasks, caseworks, etc
      .when('/CMS/contacts/:id', {
        templateUrl: 'contacts/contact',
        controller: 'ContactsController',
        controllerAs: 'cCtrl',
        access: {restricted: true}
      })
  }

})();
