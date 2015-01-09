angular.module('HY', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'templates',
    'HY.services',
    'angularCharts',
    'pascalprecht.translate',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    var sessionData = angular.fromJson(localStorage.getItem('hy_mobile') || {}),
        lastUrl = sessionData.lastUrl || '/fi/index';

    $urlRouterProvider.otherwise(lastUrl);

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
            controller: 'QuizController'
          },
          'nav@': getNavView({
            page: 1,
            navigation: {
              forward: {
                text: 'START',
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
            page: 2,
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
            obj.pageCount = $stateProvider.state.length;
            return obj;
          }
        }
      };
    }

    $locationProvider.html5Mode(false);

    $translateProvider
      .translations('fi', {
        // Defaults
        START: 'Aloita',
        NEXT: 'Seuraava',
        PREVIOUS: 'Edellinen',

        // Index
        WELCOME_TEXT: 'Tervetuloa perehtymään Helsingin Yliopiston mobiilistrategiaan.',
        INDEX_1: 'Arvioi aluksi kuinka iso osa käyttäjistä on mobiilikäyttäjiä?'
      })

      .translations('en', {
        WELCOME_TEXT: 'Welcome to Helsinki University mobile strategy.'
      });
    $translateProvider.preferredLanguage('fi');

  });
