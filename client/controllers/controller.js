/**
 * controller.js
 *
 * skeleton for controller wrapped
 * in an Immediately Invoked Function Expression (IIFE)
 *
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .controller('MenuController', menuController)
    .controller('MainController',mainController)
    .controller('AboutController', aboutController)
    .controller('ContactController',contactController)

  menuController.$inject = ['$location'];

  function menuController($location) {
    var vm = this;
    // Active link handler
    vm.menuClass = function(page) {
      var current = $location.path().substring(1);
      return page === current ? "active" : "";
    };
  }

  function mainController() {
    var vm = this;
    vm.message = 'This is home page';
    vm.title = "TeamCo";
    vm.page = "home";
  }

  function aboutController() {
    var vm = this;

    vm.message = 'All about us';
    vm.title = 'About Us';
    vm.page = "about";
  }

  function contactController() {
    var vm = this;

    vm.message = 'Contact Us page';
    vm.title = 'Contact Us'
    vm.page = "contact";

  }

})();

