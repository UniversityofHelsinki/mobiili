angular.module('HY')
  .controller('BookmarksController', function($stateParams, $scope, Bookmarks) {

    $scope.lang = $stateParams.lang;
    $scope.bookmarks = Bookmarks.list();

  });
