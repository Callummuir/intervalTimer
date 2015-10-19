'use strict';

/**
 * @ngdoc function
 * @name intervalTimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the intervalTimerApp
 */
angular.module('intervalTimerApp')
  .controller('MainCtrl', function ($scope) {
    

  	$scope.timee = 0;
  	$scope.interval = 0;
  	$scope.round = 1;

  	$scope.total = function(time, interval, round){
  		var total = (time + interval) * round;
  		return total;
  	};


  });
