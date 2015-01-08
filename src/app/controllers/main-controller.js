angular.module('HY')
  .controller('MainController', function($scope, $stateParams, $translate) {

    // Translation
    $translate.use($stateParams.lang);
  });
