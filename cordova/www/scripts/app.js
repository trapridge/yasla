'use strict';

// Declare app level module which depends on filters, and services
angular.module('lungotestApp', ['Centralway.lungo-angular-bridge', 'ngRoute', 'ngTouch', 'btford.phonegap.ready']).
  config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
    //$sceDelegateProvider.resourceUrlWhitelist(['self', 'https://en.wikipedia.org/**']);
    $routeProvider.when('/add-item', {});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }])
  .run(function($rootScope) {
    $rootScope.$on('handleEmit', function(event, args) {
      $rootScope.$broadcast('handleBroadcast', args);
    });
  });  