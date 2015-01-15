angular.module('HY')
  .controller('MainController', function($scope, $stateParams, $translate, $location, SessionData) {

    // Get last url from localStorage
    $scope.lastUrl = SessionData.lastUrl;

    // Set visited url information to localStorage data
    SessionData.set({lastUrl: $location.path()});

    // Translation
    $translate.use($stateParams.lang);
  });
