angular.module('HY')
  .controller('HeaderController', function($state, $stateParams, $scope, $translate, $location, progress, Bookmarks, Routes, Search, SessionData) {

    $scope.lang = $stateParams.lang;
    $scope.progress = progress;
    $scope.search = Search;
    $scope.searchableData = Routes.get();

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
      $state.go($state.current.name, angular.extend($state.params, {lang: langKey}), {reload: true});
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };

    $scope.bookmark = function() {
      Bookmarks.set({ url: $location.path(), title: $('.content-wrapper').find('h1, h1, h3, h4, h5, h6').first().text() });
      $scope.getBookmarkState(!$scope.isBookmarked);
    };

    $scope.$watch('search', function(newVal, oldVal) {
      if (newVal && newVal.value === oldVal.value) {
        return;
      }
      if (newVal && newVal.value.length > 0) {
        $state.go('app.search', {lang: $scope.lang});
      } else if (newVal && typeof newVal.value === 'string') {
        $location.path(SessionData.get().lastUrl);
      }
    }, true);

  });
