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
    'ngTouch'
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
            templateUrl: '/assets/views/menu.html',
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
      prefix: '/assets/translations/locale-',
      suffix: '.json'
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
