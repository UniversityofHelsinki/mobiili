angular.module('HY')
  .controller('SearchController', function($scope, $controller, $stateParams, $translate, Routes, Search) {

    $scope.lang = $stateParams.lang;
    $translate.use($stateParams.lang);

    // Get search val from Service
    $scope.search = Search;
    Routes.loadTranslations($scope.lang).then(function() {
      $scope.searchableData = Routes.getIndexedData();
    });

    $scope.closeSearch = function() {
      $scope.search.value = '';
    };
  });
