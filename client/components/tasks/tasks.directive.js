/**
 * tasks.directive.js
 *
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .directive("taskForm", taskForm)
    .directive("taskList", taskList)

  // Display form to add/edit
  function taskForm() {
    var directive = {
      restrict: "E",
      transclude: true,
      replace: false,
      templateUrl: "tasks/form",
    };

    return directive;
  }

  // Display a list of contacts
  function taskList() {
    var directive =  {
      restrict: "E",
      transclude: true,
      replace: false,
      templateUrl: "tasks/list",
    };

    return directive;
  }


})();
