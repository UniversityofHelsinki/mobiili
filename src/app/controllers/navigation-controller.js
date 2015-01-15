angular.module('HY')
  .controller('NavigationController', function($scope, $stateParams, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    var navigationDefaults = {
        forward: {
          text: 'defaults.NEXT'
        },
        back: {
          text: 'defaults.PREVIOUS'
        }
      },
      setUrls = function(backUrl, forwardUrl) {
        var newData = _.clone(navigationDefaults, true);

        newData.forward.url = forwardUrl;
        newData.back.url = backUrl;

        return newData;
      },
      routes = {
        prelude: [
          {id: 'init', addClasses: 'part-divider-view'},
          {id: 'index', navigation: setUrls(false, 'prelude/quiz/warmup')},
          {id: 'warmup', navigation: setUrls('prelude/info/index', 'part1')}
        ],
        part1: [
          {id: 'init', navigation: setUrls('prelude/info/warmup', 'part1/quiz/questions1'), addClasses: 'part-divider-view'},
          {id: 'questions1', navigation: setUrls('part1', 'part1/chart/stats1')},
          {id: 'stats1', navigation: setUrls('part1/quiz/questions1', 'part1/chart/stats2')},
          {id: 'stats2', navigation: setUrls('part1/chart/stats1', 'part1/chart/stats3')},
          {id: 'stats3', navigation: setUrls('part1/chart/stats2', 'part1/chart/stats4')},
          {id: 'stats4', navigation: setUrls('part1/chart/stats3', 'part1/info/opportunities')},
          {id: 'opportunities', navigation: setUrls('part1/chart/stats4', 'part1/info/problem')},
          {id: 'problem', navigation: setUrls('part1/chart/opportunities', 'part1/quiz/summary1')},
          {id: 'summary1', navigation: setUrls('part1/chart/problem', false)}
        ]
      },
      partRoutes = routes[$stateParams.partId],
      currentRoute = _.find(partRoutes, { id: $stateParams.pageId || 'init' });

    $scope.pageCount = partRoutes.length - 1;
    $scope.pageIndex = _.findIndex(partRoutes, { id: $stateParams.pageId });
    $scope.data = currentRoute.navigation;
    $scope.lang = $stateParams.lang;
    $scope.addClasses = currentRoute.addClasses;

    $scope.getTimes = function(n) {
      return new Array(n);
    };
  });
