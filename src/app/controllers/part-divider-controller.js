angular.module('HY')
  .controller('PartDividerController', function($scope, data, $stateParams, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    $scope.text = data.text;
    $scope.addClasses = 'part-divider';

  });
