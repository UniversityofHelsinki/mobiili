angular.module('HY')
  .controller('ChartController', function($scope, $controller, MobileVsDT, PlatformComparison, MobileUsers) {

    $scope.mobileVsDt = MobileVsDT.get();
    $scope.mobileUsers = MobileUsers.get();

    PlatformComparison.get().then(function(xhr) {
      $scope.platformComparison = PlatformComparison.parse(xhr.data);
    });

  });
