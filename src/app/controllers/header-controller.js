angular.module('HY')
  .controller('HeaderController', function($scope, $translate, $location, SessionData) {

    // TODO: Find a nicer way to do this
    $scope.lang = $location.path().split('/')[1] || 'fi';
    $scope.currentPart = SessionData.get().currentPart;
    $scope.partsCount = SessionData.get().partsCount;

    $scope.changeLanguage = function(langKey) {
      var pathArray = $location.path().split('/');
      $scope.lang = langKey;
      $location.path('/' + langKey + '/' + pathArray[pathArray.length - 1]);
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };
  });
