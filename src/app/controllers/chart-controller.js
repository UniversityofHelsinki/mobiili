angular.module('HY')
  .controller('ChartController', function($scope, $controller, MobileVsDT, PlatformComparison, MobileUsers, MobilePlatforms, AppDownloads) {

    $scope.mobileVsDt = MobileVsDT.get();
    $scope.mobileUsers = MobileUsers.get();
    $scope.mobilePlatforms = MobilePlatforms.get();
    $scope.appDownloads = AppDownloads.get();
    console.log('appDownloads', $scope.appDownloads);

    PlatformComparison.get().then(function(xhr) {
      $scope.platformComparison = PlatformComparison.parse(xhr.data);
    });

  });
