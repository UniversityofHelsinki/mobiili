angular.module('HY')
  .controller('MainController', function($scope, $stateParams, $translate, $location) {

    // Set localStorage data
    localStorage.setItem('hy_mobile', angular.toJson({lastUrl: $location.path()}));

    // Translation
    $translate.use($stateParams.lang);
  });
