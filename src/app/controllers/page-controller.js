angular.module('HY')
  .controller('PageController', function($scope, $routeParams, BrowserUsage) {

    $scope.content = 'Test content';
    $scope.data = {};

    BrowserUsage.get().then(function(xhr) {
      console.log('data', BrowserUsage.parse(xhr.data));
      $scope.data = BrowserUsage.parse(xhr.data);
    });

    $scope.chartType = 'line';

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
