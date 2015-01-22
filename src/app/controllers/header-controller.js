angular.module('HY')
  .controller('HeaderController', function($state, $stateParams, $scope, $translate, $location, progress, Bookmarks, Routes, Search, SessionData) {

    $scope.lang = $stateParams.lang;
    $scope.progress = progress;
    $scope.search = Search;
    $scope.searchableData = Routes.getIndexedData($scope.lang);
    $scope.subNav = ['prelude', 'part1', 'part2', 'part3', 'part4', 'part5'];

    if ($state.current.name === 'app.bookmarks' || $state.current.name === 'app.search') {
      $scope.addClasses = 'hide-controls';
    } else if (!$stateParams.pageId) {
      $scope.addClasses = 'part-divider-active';
    }

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
      var path = '/' + _.rest($location.path().split('/'), 2).join('/'),
          pageHeader = _.find($scope.searchableData, {id: path}).content.HEADER || '';

      Bookmarks.set({ url: $location.path(), title:  pageHeader});
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
