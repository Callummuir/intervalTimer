'use strict';

/**
 * @ngdoc overview
 * @name intervalTimerApp
 * @description
 * # intervalTimerApp
 *
 * Main module of the application.
 */
angular
  .module('intervalTimerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
