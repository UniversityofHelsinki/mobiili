angular.module('HY')
  .controller('PartDividerController', function($scope, $stateParams, $controller, Utils) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    $scope.text = 'parts.' + $stateParams.partId.toUpperCase();
    $scope.partNo = Utils.romanize(parseInt($stateParams.partId.replace('part', '')));
    $scope.addClasses = 'part-divider';

  });
