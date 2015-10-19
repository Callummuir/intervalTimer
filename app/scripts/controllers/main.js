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
    
  	//going to have to remove these from the countdown values as the yare just for input
  	$scope.timee = 0;
  	$scope.interval = 0;
  	$scope.round = 1;

  	$scope.total = function(time, interval, round){
  		var total = (time + interval) * round;
  		return total;
  	};

  	//Starts the (final)countdown 
  	//TODO do the countdown better
  	$scope.startCountdown = function(){
  		if($scope.timee === 0){
  			if($scope.interval === 0){
  				if($scope.round === 0){
  					console.log("countdown over!");
  					return;
  				}else{
  					countDownRound();
  				}

  			}else{
  				countDownInterval();
  			}

  		}else{
  			countDownTime();
  		}

  		$scope.startCountdown();

  	};

  	var countDownTime = function(){
  		console.log("count time");
  		$scope.timee -= 1;
  	};

		var countDownInterval = function(){
			console.log("count tinterval");
  		$scope.interval -= 1;
  	};


		var countDownRound = function(){
			console.log("count round");
  		$scope.round -= 1;
  		$scope.timee = 10;
  		$scope.interval = 10;
  	};




  });
