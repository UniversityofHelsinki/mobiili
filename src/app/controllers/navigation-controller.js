angular.module('HY')
  .controller('NavigationController', function($scope, $stateParams, $controller) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));

    var routes = [
        {
          id: 'prelude',
          routes: [
            {id: 'init', addClasses: 'part-divider-view'},
            {id: 'index', type: 'info'},
            {id: 'warmup', type: 'quiz'}
          ]
        },
        {
          id: 'part1',
          routes: [
            {id: 'init', addClasses: 'part-divider-view'},
            {id: 'questions1', type: 'quiz'},
            {id: 'stats1', type: 'chart'},
            {id: 'stats2', type: 'chart'},
            {id: 'stats3', type: 'chart'},
            {id: 'stats4', type: 'chart'},
            {id: 'opportunities', type: 'info'},
            {id: 'problem', type: 'info'},
            {id: 'summary1', type: 'quiz'}
          ]
        },
        {
          id: 'part2',
          routes: [
            {id: 'init', type: '', addClasses: 'part-divider-view'},
            {id: 'questions2', type: 'quiz'},
            {id: 'device-independency', type: 'info'},
            {id: 'future-predict', type: 'chart'},
            {id: 'standards', type: 'chart'},
            {id: 'open-principals', type: 'info'},
            {id: 'open-data', type: 'info'},
            {id: 'open-source', type: 'info'},
            {id: 'open-source2', type: 'info'}
          ]
        },
        {
          id: 'part3',
          routes: [
            {id: 'init', addClasses: 'part-divider-view'},
            {id: 'mobile-friendly', type: 'info'}
          ]
        },
        {
          id: 'part4',
          routes: [
            {id: 'init', addClasses: 'part-divider-view'},
            {id: 'questions3', type: 'quiz'},
            {id: 'mobile-web', type: 'info'},
            {id: 'mobile-web2', type: 'info'},
            {id: 'features', type: 'info'}
          ]
        },
        {
          id: 'part5',
          routes: [
            {id: 'init', addClasses: 'part-divider-view'},
            {id: 'questions4', type: 'quiz'},
            {id: 'native-hybrid', type: 'info'},
            {id: 'comparison', type: 'info'},
            {id: 'stats5', type: 'chart'},
            {id: 'app-strength', type: 'info'},
            {id: 'apps', type: 'info'},
            {id: 'app-downloads', type: 'chart'}
          ]
        }
      ],
      part = _.find(routes, {id: $stateParams.partId}),
      partIndex = _.findIndex(routes, {id: $stateParams.partId}),
      partRoutes = part.routes,
      currentRoute = _.find(partRoutes, { id: $stateParams.pageId || 'init' });

    // TODO: Handle broken route
    // if (typeof currentRoute === 'undefined') {
    // }

    $scope.pageCount = partRoutes.length - 1;

    // In case pageId is missing, we are dealing with init page, so we need to manually add correct index
    $scope.pageIndex = $stateParams.pageId ? _.findIndex(partRoutes, { id: $stateParams.pageId }) : 0;

    $scope.lang = $stateParams.lang;
    $scope.addClasses = currentRoute.addClasses;

    $scope.forward = (function() {
      var next,
          retVal = {
            text: 'defaults.NEXT'
          };
      if ($scope.pageIndex < $scope.pageCount) {
        next = partRoutes[$scope.pageIndex + 1];
        retVal.url = $stateParams.partId + '/' + next.type + '/' + next.id;
      } else if (partIndex + 1 < routes.length) {
        // Not in the same part
        retVal.url = routes[partIndex + 1].id;
      }

      return retVal;
    })();

    $scope.back = (function() {
      var back,
          retVal = {
            text: 'defaults.PREVIOUS'
          };

      if ($scope.pageIndex === 1) {
        // Back to init page
        retVal.url = routes[partIndex].id;
      } else if ($scope.pageIndex > 1) {
        back = partRoutes[$scope.pageIndex - 1];
        retVal.url = $stateParams.partId + '/' + back.type + '/' + back.id;
      } else if (partIndex > 0) {
        // Not in the same part and not the first part in question
        back = routes[partIndex - 1];
        retVal.url = back.id + '/' + back.routes[back.routes.length - 1].type + '/' + back.routes[back.routes.length - 1].id;
      }

      return retVal;
    })();

    $scope.getTimes = function(n) {
      return new Array(n);
    };
  });
