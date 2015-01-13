angular.module('HY')
  .controller('BrowserUsageController', function($scope, $routeParams, $controller, BrowserUsage) {

    $scope.data = {};

    BrowserUsage.get().then(function(xhr) {
      $scope.data = BrowserUsage.parse(xhr.data);
    });

    $scope.chartType = 'bar';

    $scope.config = {
      labels: false,
      title: 'Browser Usage',
      legend: {
        display: true,
        position: 'left'
      },
      innerRadius: 0
    };
  });
