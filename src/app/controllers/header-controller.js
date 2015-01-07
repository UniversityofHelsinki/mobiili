angular.module('HY')
  .controller('HeaderController', function($scope, $translate, $location, $routeParams) {
    var pathArray = $location.path().split('/');

    // TODO: Find a nicer way to do this
    $scope.lang = pathArray[1];

    $scope.changeLanguage = function(langKey) {
      $location.path('/' + langKey + '/' + pathArray[pathArray.length - 1]);
      $scope.lang = langKey;
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };
  });
