angular.module('HY')
  .controller('PartDividerController', function($scope, $stateParams, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    $scope.text = 'parts.' + $stateParams.partId.toUpperCase();
    $scope.addClasses = 'part-divider';

  });
