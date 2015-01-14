angular.module('HY')
  .controller('ChartController', function($scope, $controller, MobileVsDT, PlatformComparison) {

    $scope.mobileVsDt = MobileVsDT.get();

    PlatformComparison.get().then(function(xhr) {
      $scope.platformComparison = PlatformComparison.parse(xhr.data);
    });

  });
