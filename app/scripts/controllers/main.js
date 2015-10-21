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
    
  	// These variables store the start values
  	$scope.roundTime = 0;
  	$scope.intervalTime = 0;
  	$scope.roundNumber = 1;
  	// These varibles are counted on


  	$scope.total = function(){
  		return ($scope.roundTime + $scope.intervalTime) * $scope.roundNumber;
  	};

  	//Starts the (final)countdown 
  	//TODO do the countdown better
  	$scope.startCountdown = function(){
  		if($scope.roundTime === 0){
  			if($scope.intervalTime === 0){
  				if($scope.roundNumber === 0){
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
  		$scope.roundTime -= 1;
  	};

		var countDownInterval = function(){
			console.log("count tinterval");
  		$scope.intervalTime -= 1;
  	};


		var countDownRound = function(){
			console.log("count round");
  		$scope.roundNumber -= 1;
  		$scope.roundTime = 10;
  		$scope.intervalTime = 10;
  	};






  });
