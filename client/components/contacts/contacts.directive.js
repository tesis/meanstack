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
    .directive("taskListContacts", taskListContacts)
    .directive("confirm", confirm)
    .directive("username", username)
    .directive("email", checkEmail)

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
  function taskListContacts() {
    var directive =  {
      restrict: "E",
      transclude: true,
      replace: false,
      templateUrl: "contacts/task-list",
    };

    return directive;
  }

  function username(ContactsService) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        elem.bind('blur', function (e) {
          if (!ngModel || !elem.val()) return;

          var modelValue = elem.val();
          var id = attrs.contactId;

          ContactsService.unique('username', modelValue, id)
          .then(function(data){
            ngModel.$setValidity('usernameExists', data);
          })
          .catch(function (fallback) {
              ngModel.$setValidity('usernameExists', false);
            });
        });
      }
    };
  }

  function checkEmail(ContactsService) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        // console.log(scope)
        // console.log(elem)
        // console.log(ngModel)

        elem.bind('blur', function (e) {
          if (!ngModel || !elem.val()) return;
          // var keyProperty = scope.$eval(attrs.fieldData);

          var modelValue = elem.val();
          var id = attrs.contactId;

          ContactsService.unique('email', modelValue, id)
          .then(function(data){
            ngModel.$setValidity('emailExists', data);
          })
          .catch(function (fallback) {
              ngModel.$setValidity('emailExists', false);
            });
        });
      }
    };
  }

})();
