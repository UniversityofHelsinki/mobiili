angular.module('HY')
  .controller('PartDividerController', function($scope, $stateParams, $location, $controller, Utils, SessionData) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    // Set last url information to localStorage data
    SessionData.set({lastUrl: $location.path()});

    $scope.text = 'parts.' + $stateParams.partId.toUpperCase();
    $scope.partNo = Utils.romanize(parseInt($stateParams.partId.replace('part', '')));
    $scope.addClasses = 'part-divider';

  });
