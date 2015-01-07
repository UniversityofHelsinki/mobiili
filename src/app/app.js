angular.module('HY', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'templates',
    'HY.services',
    'angularCharts',
    'pascalprecht.translate'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    // $urlRouterProvider.otherwise('/fi/index');

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

    function getNavView(obj) {
      return {
        templateUrl: 'assets/views/navi.html',
        controller: 'NavigationController',
        resolve: {
          data: function() {
            return obj;
          }
        }
      }
    };

    $locationProvider.html5Mode(false);

    $translateProvider
      .translations('fi', {
        WELCOME_TEXT: 'Tervetuloa perehtymään Helsingin Yliopiston mobiilistrategiaan.'
      })
      .translations('en', {
        WELCOME_TEXT: 'Welcome to Helsinki University mobile strategy.'
      });
    $translateProvider.preferredLanguage('fi');

  });
