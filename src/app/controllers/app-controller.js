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
  $scope.swipeLeft = function($event) {
    console.log('SWIPE', $event);
    // Do not change page if tour is active or if user is scrolling table content
    if (!$tour.isActive() && $($event.target).parents('.table-wrapper').length === 0) {
      $location.path(Routes.getNextUrl());
    // } else {
    //   $event.stopPropagation();
    }
  };
  $scope.swipeRight = function($event) {
    console.log('SWIPE', $event);
    if (!$tour.isActive() && $($event.target).parents('.table-wrapper').length === 0) {
      $location.path(Routes.getPreviousUrl());
    // } else {
    //   $event.stopPropagation();
    }
  };

  $scope.cancelSwipe = function($event) {
    console.log('CANCEL SWIPE');
    $event.stopPropagation();
  };

  $scope.startTour = $tour.start;

});
