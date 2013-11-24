'use strict';

// Declare app level module which depends on filters, and services
angular.module('lungotestApp', ['Centralway.lungo-angular-bridge', 'ngRoute', 'ngResource', 'ngTouch', 'btford.phonegap.ready']).
  config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://en.wikipedia.org/**']);
    $routeProvider.when('/add-todo', {});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }])
  .run(function($rootScope) {
    $rootScope.$on('handleEmit', function(event, args) {
      $rootScope.$broadcast('handleBroadcast', args);
    });
  });  


/*
'use strict';

angular.module('lungotestApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
*/