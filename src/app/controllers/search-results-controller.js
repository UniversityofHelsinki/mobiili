angular.module('HY')
  .controller('SearchController', function($scope, $controller, $stateParams, $translate, Routes, Search) {

    $scope.lang = $stateParams.lang;
    $translate.use($stateParams.lang);

    // Get search val from Service
    $scope.search = Search;
    $scope.searchableData = Routes.getIndexedData($scope.lang);

    $scope.closeSearch = function() {
      $scope.search.value = '';
    };
  });
