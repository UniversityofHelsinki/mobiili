angular.module('HY')
  .controller('DefaultController', function($scope, $stateParams, $translate) {
    $translate.use($stateParams.lang);
  });
