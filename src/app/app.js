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
      when('/:lang/index', {
        templateUrl:'assets/views/index.html',
        controller: 'DefaultController'
      }).
      when('/:lang/browser_usage', {
        templateUrl: 'assets/views/page.html',
        controller: 'BrowserUsageController'
      }).
      otherwise({
        redirectTo: '/fi/index'
      });

    $locationProvider.html5Mode(false);
  });
