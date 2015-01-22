angular.module('HY')
  .controller('BookmarksController', function($stateParams, $scope, Bookmarks, SessionData) {

    $scope.lang = $stateParams.lang;
    $scope.bookmarks = Bookmarks.list();
    $scope.backUrl = SessionData.get().lastUrl;

  });
