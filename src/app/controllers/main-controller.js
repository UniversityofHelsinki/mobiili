angular.module('HY')
  .controller('MainController', function($scope, $state, $stateParams, $translate, $location, $timeout, $tour, SessionData, Experience) {

    if (!$state.is('app.notFound')) {
      // Set visited url information for progress use
      Experience.set($location.path());
    }

    // Start tour on first page
    if ($stateParams.partId === 'prelude' && $stateParams.pageId === 'index' && typeof SessionData.get().showTutorial === 'undefined') {
      SessionData.set({showTutorial: false});
      $timeout(function() {
        // Timeout to fix position issues
        if (!$tour.isActive()) {
          $tour.start();
        } else {
          $tour.end();
        }
      }, 100);
    } else {
      $tour.end();
    }

    // Translation
    $translate.use($stateParams.lang);

  });
