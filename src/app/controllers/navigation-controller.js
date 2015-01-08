angular.module('HY')
  .controller('NavigationController', function($scope, data, $stateParams, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));
    $scope.data = data;
    $scope.lang = $stateParams.lang;

    $scope.getTimes = function(n) {
      return new Array(n);
    };
  });
