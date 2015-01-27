angular.module('HY')
  .controller('AppController', function($scope, $location, $window, $tour, Routes) {

  // Key navigation
  angular.element($window).on('keydown', function(e) {
    if (e.keyCode === 37 && Routes.getPreviousUrl() !== '' && !$tour.isActive()) {
      e.preventDefault();
      e.stopPropagation();
      $scope.$apply(function() {
        $location.path(Routes.getPreviousUrl());
      });
    } else if (e.keyCode === 39 && Routes.getNextUrl() !== '') {
      e.preventDefault();
      e.stopPropagation();
      $scope.$apply(function() {
        if ($tour.isActive()) {
          $tour.has($tour.current() + 1) ? $tour.next() : $tour.end();
        } else {
          $location.path(Routes.getNextUrl());
        }
      });
    }
  });

  // Swipe events for body
  $scope.swipeLeft = function() {
    if (!$tour.isActive()) {$location.path(Routes.getNextUrl())};
  };
  $scope.swipeRight = function() {
    if (!$tour.isActive()) {$location.path(Routes.getPreviousUrl())};
  };

  $scope.startTour = $tour.start;

});
