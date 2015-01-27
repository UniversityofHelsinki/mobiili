angular.module('HY')
  .controller('BookmarksController', function($stateParams, $location, $scope, Bookmarks, SessionData, Routes) {

    $scope.lang = $stateParams.lang;
    $scope.bookmarks = Bookmarks.list();
    $scope.backUrl = SessionData.get().lastUrl;

    Routes.loadTranslations($scope.lang).then(function() {
      $scope.searchableData = Routes.getIndexedData();
    });

    $scope.getBookmarkState = function(isBookmarked) {
      if (typeof isBookmarked === 'undefined') {
        isBookmarked = typeof Bookmarks.get($location.path()) !== 'undefined';
      }
      $scope.isBookmarked = isBookmarked;
      $scope.bookmarkIcon = isBookmarked ? 'fa fa-heart active' : 'fa fa-heart-o';
      $scope.bookmarkText = isBookmarked ? 'defaults.UNBOOKMARK' : 'defaults.BOOKMARK';

    };

    $scope.getBookmarkState();

    $scope.bookmark = function() {
      var path = '/' + _.rest($location.path().split('/'), 2).join('/'),
          pageHeader = _.find($scope.searchableData, {id: path}).content.HEADER || '';

      Bookmarks.set({ url: $location.path(), title:  pageHeader});
      $scope.getBookmarkState(!$scope.isBookmarked);
    };

  });
