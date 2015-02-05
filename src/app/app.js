angular.module('HY', [
    'ngResource',
    'ui.router',
    'templates',
    'mm.foundation',
    'pascalprecht.translate',
    'HY.services',
    'ngAnimate',
    'tc.chartjs',
    'angulartics',
    'angulartics.google.analytics',
    'ng-fastclick',
    'hmTouchEvents'
  ])
  .value('progress', {})
  .run(function($state, $rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams) {
      event.preventDefault();
      $state.go('app.notFound', toParams, {location: false});
    });
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    var sessionData = angular.fromJson(localStorage.getItem('hy_mobile') || {}),
        lastUrl = sessionData.lastUrl || '/fi/prelude';
    $urlRouterProvider.otherwise(lastUrl);

    $stateProvider
      .state('app', {
        template: '<ui-view />',
        controller: 'MainController',
        abstract: true
      })
      .state('app.search', {
        url: '/:lang/search',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: 'assets/views/search-results.html',
            controller: 'SearchController'
          }
        }
      })
      .state('app.bookmarks', {
        url: '/:lang/bookmarks',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: 'assets/views/bookmarks.html',
            controller: 'BookmarksController'
          }
        }
      })
      .state('app.info', {
        url: '/:lang/:partId/info/:pageId',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.partId + '/' + $stateParams.pageId + '.html';
            },
            controller: 'InfoController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.chart', {
        url: '/:lang/:partId/chart/:pageId',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.partId + '/' + $stateParams.pageId + '.html';
            },
            controller: 'ChartController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.quiz', {
        url: '/:lang/:partId/quiz/:pageId',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.partId + '/' + $stateParams.pageId + '.html';
            },
            controller: 'QuizController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.notFound', {
        url: '/:lang/notFound',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: 'assets/views/not-found.html',
            controller: 'MainController'
          }
        }
      })
      .state('app.Part', {
        url: '/:lang/:partId',
        views: {
          'header@': {
            templateUrl: 'assets/views/menu.html',
            controller: 'HeaderController'
          },
          'content@': {
            templateUrl: 'assets/views/part-divider.html',
            controller: 'PartDividerController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      });

    $locationProvider.html5Mode(false);

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/translations/locale-',
      suffix: '.json',
      cache: true
    });
    $translateProvider.preferredLanguage('fi');

  })
  .filter('searchHits', function() {
    return function(data, searchTerm) {
      if (searchTerm.trim() !== '') {
        var regex = new RegExp(searchTerm, 'gi'),
            hitData = [];

        angular.forEach(data, function(obj) {
          var hits = [];
          angular.forEach(obj.content, function(value) {
            if (value.match(regex)) {
              hits.push(value);
            }
          });
          if (hits.length > 0) {
            obj.parsedHits = hits;
            hitData.push(obj);
          }
        });

        return hitData;
      }
    };
  })
  .filter('highlight', function($sce) {
    return function(str, searchTerm) {
      var regex = new RegExp(searchTerm, 'gi'),
          replacedVal = str.replace(regex, '<span class="match">$&</span>');

      return $sce.trustAsHtml(replacedVal);
    };
  });

// Override Foundation Tour template
angular.module('template/tour/tour.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tour/tour.html',
    '<div class=\'joyride-tip-guide\' ng-class=\'{ in: isOpen(), fade: animation() }\'>\n' +
    '  <span class=\'joyride-nub\' ng-class=\'{\n' +
    '    bottom: placement === "top",\n' +
    '    left: placement === "right",\n' +
    '    right: placement === "left",\n' +
    '    top: placement === "bottom"\n' +
    '  }\'></span>\n' +
    '  <div class=\'joyride-content-wrapper\'>\n' +
    '    <h4 ng-bind=\'title\' ng-show=\'title\'></h4>\n' +
    '    <p ng-bind=\'content\'></p>\n' +
    '    <a class=\'small button success joyride-next-tip\' ng-show=\'!isLastStep()\' ng-click=\'nextStep()\'>{{"defaults.NEXT" | translate}}</a>\n' +
    '    <a class=\'small button success joyride-next-tip\' ng-show=\'isLastStep()\' ng-click=\'endTour()\'>{{"defaults.END" | translate}}</a>\n' +
    '    <a class=\'joyride-close-tip\' ng-click=\'endTour()\'>&times;</a>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
