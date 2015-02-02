angular.module('HY')
  .controller('MainController', function($scope, $state, $stateParams, $translate, $location, $timeout, $tour, SessionData, Experience) {

    if (!$state.is('app.notFound') && !$state.is('app.search') && !$state.is('app.bookmarks')) {
      // Set last url information to localStorage data
      SessionData.set({lastUrl: $location.path()});
    }

    if (!$state.is('app.notFound')) {
      // Set visited url information for progress use
      Experience.set($location.path());
    }

    // Start tour on first page
    if ($stateParams.partId === 'prelude' && $stateParams.pageId === 'index' && typeof SessionData.get().showTutorial === 'undefined') {
      SessionData.set({showTutorial: false});
      $timeout(function() {
        // Timeout to fix position issues
        $tour.start();
      }, 2000);
    }

    // Translation
    $translate.use($stateParams.lang);

  });
