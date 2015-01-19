angular.module('HY')
  .controller('SearchController', function($rootScope, $scope, $translate, translations, Routes) {
    console.log('Search controller');
    var routes = Routes.get();

    // Get search val from rootScope
    $scope.search = $rootScope.search; //$rootScope.search;

    // Index content (translations) with routes for search filter
    $scope.searchableData = _.flatten(_.map(routes, function(part) {
      // Reject init views = part dividers
      return _.map(_.reject(part.routes, {id: 'init'}), function(route) {
        return {
          content: translations[$translate.use()][route.translationNamespace],
          url: '/' + part.id + '/' + route.type + '/' + route.id
        };
      });
    }));
    console.log('searchableData', $scope.searchableData);
  });
