angular.module('HY')
  .controller('MainController', function($scope, $state, $stateParams, $translate, $location, SessionData, Experience) {

    if (!$state.is('app.notFound')) {
      // Set last url information to localStorage data
      SessionData.set({lastUrl: $location.path()});

      // Set visited url information for progress use
      Experience.set($location.path());
    }

    // Translation
    $translate.use($stateParams.lang);

  });
