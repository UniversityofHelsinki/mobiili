angular.module('HY')
  .controller('PageController', function($scope, $routeParams) {
      console.log('Hello, world from PageController!', $routeParams);
      $scope.content = 'Test content';
    });
