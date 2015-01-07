angular.module('HY', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'templates',
    'HY.services',
    'angularCharts'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/fi/index');

    $stateProvider
      .state('app', {
        template: '<ui-view />',
        controller: 'MainController',
        abstract: true
      })
      .state('app.index', {
        url: '/:lang/index',
        views: {
          'content@': {
            templateUrl: 'assets/views/index.html',
            controller: 'DefaultController'
          },
          'nav@': getNavView({
            navigation: {
              forward: {
                text: 'Aloita',
                url: 'browser_usage'
              }
            }
          })
        }
      })
      .state('app.browser_usage', {
        url: '/:lang/browser_usage',
        views: {
          'content@': {
            templateUrl: 'assets/views/browser-usage.html',
            controller: 'BrowserUsageController'
          },
          'nav@': getNavView({
            navigation: {
              forward: {
                text: 'Seuraava',
                url: 'index'
              },
              back: {
                text: 'Takaisin',
                url: 'index'
              }
            }
          })
        }
      });
      // when('/:lang/browser_usage', {
      //   templateUrl: 'assets/views/page.html',
      //   controller: 'BrowserUsageController'
      // }).
      // otherwise({
      //   redirectTo: '/fi/index'
      // });

    function getNavView(obj) {
      return {
        templateUrl: 'assets/views/navi.html',
        controller: 'NavigationController',
        resolve: {
          data: function() {
            return {data: obj}
          }
        }
      }
    };

    $locationProvider.html5Mode(false);
  });
