angular.module('HY')
  .controller('NavigationController', function($scope, data, $stateParams) {
    $scope.data = data;
    $scope.lang = $stateParams.lang;
  });
