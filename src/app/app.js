angular.module('HY', [
    'ngResource',
    'ngRoute',
    'templates',
    'HY.services',
    'angularCharts'
  ])
  .config(function($routeProvider, $locationProvider) {
    console.log('Hello from config');
    $routeProvider.
      when('/:lang/:pageId', {
        templateUrl: function(args) {
          return 'assets/views/page.html';
        },
        controller: 'PageController'
      }).
      otherwise({
        redirectTo: '/fi/index'
      });

    $locationProvider.html5Mode(false);
  });
