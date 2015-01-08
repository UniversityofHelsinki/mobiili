angular.module('HY')
  .controller('DefaultController', function($scope, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));
  });
