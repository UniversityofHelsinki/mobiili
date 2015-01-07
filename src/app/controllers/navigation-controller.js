angular.module('HY')
  .controller('NavigationController', function($scope, data) {
    console.log('Hello, world from NaviController!', data);
    $scope.data = data;
  });
