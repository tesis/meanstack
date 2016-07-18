angular.module('ngConfirmModule', ['ui.bootstrap.modal'])
  .directive('ngConfirmClick', ['$uibModal',
    function($uibModal) {

      var ModalInstanceCtrl = function($scope, $uibModalInstance) {
        $scope.ok = function() {
          $uibModalInstance.close();
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
        };
      };

      return {
        restrict: 'A',
        scope: {
          ngConfirmClick:"&"
        },
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            var message = attrs.ngConfirmMessage || "Are you sure ?";

            var modalInstance = $uibModal.open({
                // public folder, ie: partials
                templateUrl: 'partials/confirm',
                controller: ModalInstanceCtrl,
                resolve: {
                message: function() {
                  scope.message = 'this is a msg';
                    return 'this is a message';
                }
            }
              });
            modalInstance.result.then(function () {
              scope.ngConfirmClick();
            }, function () {
              //
            });
          });
        }
      }
    }
  ]);