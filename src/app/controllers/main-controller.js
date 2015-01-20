angular.module('HY')
  .controller('MainController', function($scope, $state, $stateParams, $translate, $location, SessionData, Search) {

    // Get last url from localStorage
    $scope.lastUrl = SessionData.get().lastUrl;

    if (!$state.is('app.notFound')) {
      // Set visited url information to localStorage data
      SessionData.set({lastUrl: $location.path()});
    }

    // Translation
    $translate.use($stateParams.lang);
  });
