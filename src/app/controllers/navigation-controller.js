angular.module('HY')
  .controller('NavigationController', function($window, $location, $rootScope, $scope, $stateParams, $controller, $state, $swipe, progress, Routes) {
    angular.extend(this, $controller('MainController', {$scope: $scope}));
    var part,
        partIndex,
        partRoutes,
        currentRoute,
        routes = Routes.get();

    // Set progress info
    progress.partsCount = routes.length;

    part = _.find(routes, {id: $stateParams.partId});

    if (typeof part === 'undefined' || typeof (_.find(part.routes, { id: $stateParams.pageId || 'init' })) === 'undefined') {
      // Redirect to not found if part does not exist
      $state.go('app.notFound', $stateParams, {location: false});

    } else {
      partIndex = _.findIndex(routes, {id: $stateParams.partId});
      partRoutes = part.routes;
      currentRoute = _.find(partRoutes, { id: $stateParams.pageId || 'init' });

      // Set progress info
      progress.currentPart = partIndex + 1;

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

        retVal.url ? Routes.setNextUrl('/' + $scope.lang + '/' + retVal.url) : Routes.setNextUrl('');
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

        retVal.url ? Routes.setPreviousUrl('/' + $scope.lang + '/' + retVal.url) : Routes.setPreviousUrl('');
        return retVal;
      })();

      $scope.getTimes = function(n) {
        return new Array(n);
      };
    }
  });
