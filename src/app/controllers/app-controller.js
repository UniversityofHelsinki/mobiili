angular.module('HY')
  .controller('AppController', function($scope, $location, $window, Routes) {

  // Key navigation
  angular.element($window).on('keydown', function(e) {
    if (e.keyCode === 37 && Routes.getPreviousUrl() !== '') {
      e.preventDefault();
      e.stopPropagation();
      $scope.$apply(function() {
        $location.path(Routes.getPreviousUrl());
      });
    } else if (e.keyCode === 39 && Routes.getNextUrl() !== '') {
      e.preventDefault();
      e.stopPropagation();
      $scope.$apply(function() {
        $location.path(Routes.getNextUrl());
      });
    }
  });

  // Swipe events for body
  $scope.swipeLeft = function() {
    $location.path(Routes.getNextUrl());
  };
  $scope.swipeRight = function() {
    $location.path(Routes.getPreviousUrl());
  };

});
