angular.module('HY')
  .controller('HeaderController', function($scope, $translate, $location, progress) {

    // TODO: Find a nicer way to do this
    $scope.lang = $location.path().split('/')[1] || 'fi';
    $scope.progress = progress;

    $scope.changeLanguage = function(langKey) {
      var pathArray = $location.path().split('/');
      $scope.lang = langKey;
      $location.path('/' + langKey + '/' + pathArray[pathArray.length - 1]);
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };
  });
