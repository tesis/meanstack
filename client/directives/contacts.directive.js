/**
 * contacts.directive.js
 *
 * no globals
 */

(function() {

  'use strict';

  angular
    .module('myApp')
    .directive("contactForm", contactForm)
    .directive("contactList", contactList)
  
  // Display contact form to add/edit contact
  function contactForm() {
    var directive = {
      restrict: "E",
      transclude: true,
      replace: false,
      templateUrl: "contacts/form",
    };

    return directive;
  }
  
  // Display a list of contacts
  function contactList() {
    var directive =  {
      restrict: "E",
      transclude: true,
      replace: false,
      templateUrl: "contacts/list",
    };

    return directive;
  }

})();
