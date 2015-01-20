angular.module('HY')
  .controller('SearchController', function($scope, $controller, $translate, translations, Routes, Search) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));
    console.log('Search controller');
    var routes = Routes.get();

    // Get search val from Service
    $scope.search = Search;

    $scope.lang = $translate.use();

    // Index content (translations) with routes for search filter
    $scope.searchableData = _.flatten(_.map(routes, function(part) {
      // Reject init views = part dividers
      return _.map(_.reject(part.routes, {id: 'init'}), function(route) {
        return {
          id: '/' + part.id + '/' + route.type + '/' + route.id,
          content: translations[$translate.use()][route.translationNamespace],
          url: '/' + part.id + '/' + route.type + '/' + route.id
        };
      });
    }));
  });
