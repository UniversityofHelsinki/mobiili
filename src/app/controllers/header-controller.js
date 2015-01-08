angular.module('HY')
  .controller('HeaderController', function($scope, $translate, $location, $routeParams) {

    // TODO: Find a nicer way to do this
    $scope.lang = $location.path().split('/')[1];

    $scope.changeLanguage = function(langKey) {
      var pathArray = $location.path().split('/');
      $scope.lang = langKey;
      $location.path('/' + langKey + '/' + pathArray[pathArray.length - 1]);
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };
  });
