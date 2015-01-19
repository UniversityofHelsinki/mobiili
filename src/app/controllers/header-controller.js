angular.module('HY')
  .controller('HeaderController', function($scope, $translate, $location, progress, Bookmarks) {

    // TODO: Find a nicer way to do this
    $scope.lang = $location.path().split('/')[1] || 'fi';
    $scope.progress = progress;

    $scope.getBookmarkState = function(isBookmarked) {
      if (typeof isBookmarked === 'undefined') {
        isBookmarked = Bookmarks.get($location.path());
      }
      $scope.isBookmarked = isBookmarked;
      $scope.bookmarkIcon = isBookmarked ? 'fa fa-heart active' : 'fa fa-heart-o';
      $scope.bookmarkText = isBookmarked ? 'defaults.UNBOOKMARK' : 'defaults.BOOKMARK';
    };

    $scope.getBookmarkState();

    $scope.changeLanguage = function(langKey) {
      var pathArray = $location.path().split('/');
      $scope.lang = langKey;
      $location.path('/' + langKey + '/' + pathArray[pathArray.length - 1]);
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };

    $scope.bookmark = function() {
      Bookmarks.set({ url: $location.path(), title: $('.content-wrapper').find('h1, h1, h3, h4, h5, h6').first().text() });
      $scope.getBookmarkState(!$scope.isBookmarked);
    };

  });
