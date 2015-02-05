angular.module('HY')
  .controller('PartDividerController', function($scope, $stateParams, $location, $controller, Utils, SessionData) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    // Set last url information to localStorage data
    SessionData.set({lastUrl: $location.path()});

    $scope.text = 'parts.' + $stateParams.partId.toUpperCase();
    $scope.partNo = Utils.romanize(parseInt($stateParams.partId.replace('part', ''), 10));
    $scope.addClasses = 'part-divider';

    if ($stateParams.partId === 'end') {
      $scope.link = 'https://flamma.helsinki.fi/fi/tietotekniikka/asiakasvastaavat';
      $scope.linkText = 'Flamma';
    }

  });
