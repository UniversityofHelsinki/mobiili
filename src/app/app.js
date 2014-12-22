angular.module('HY', [
    'ngResource',
    'ngRoute',
    'templates'
  ])
  .config(function($routeProvider, $locationProvider) {
    console.log('Hello from config');
    $routeProvider.
      when('/:lang/:pageId', {
        templateUrl: function(args) {
          console.log('Template args', args);
          return 'assets/views/page.html';
        },
        controller: 'PageController'
      }).
      otherwise({
        redirectTo: '/fi/index'
      });

    $locationProvider.html5Mode(false);
  });
