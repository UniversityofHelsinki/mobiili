angular.module('HY')
  .controller('ChartController', function($scope, $routeParams, $controller, MobileVsDT) {

    $scope.mobileVsDt = MobileVsDT.get();
  });
