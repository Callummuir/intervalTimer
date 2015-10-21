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
  	// These varibles are counted down on
  	var thisRoundTime = 0;
  	var thisIntervalTime = 0;
  	var thisRoundNumber = 1;
  	var timePassed = 0;

  	//timer
  	var countdownTimer;


  	//Calculates the total amount of time to display
  	$scope.total = function(){
  	  return (($scope.roundTime + $scope.intervalTime) * $scope.roundNumber) - timePassed;	
  	};

		///////////// Button functions /////////////  	

  	//Function when the start button is pressed
  	$scope.startButtonPress = function(){
  		//Assign values to be counted down
  		thisRoundTime = $scope.roundTime;
  		thisIntervalTime = $scope.intervalTime;
  		thisRoundNumber = $scope.roundNumber;

  		//Change buttons and display


  		//start (final)countdown
  		startCountDown();
  	};

  	//Function when the stop button is pressed
  	$scope.stopButtonPress = function(){
  		//Change buttons and display
  		
  	};

  	//Function when the pause button is pressed
  	$scope.pauseButtonPress = function(){
  		//Change buttons and display
  	};

  	//Fucntion for reset button is pressed
  	$scope.resetButtonPress = function(){
  		//Reset values
  		$scope.roundTime = 0;
  		$scope.intervalTime = 0;
  		$scope.roundNumber = 1;
  	};

  	///////////// Count functions /////////////

  	//Function for starting counting functionality
  	var startCountDown = function(){
  		countdownTimer = setInterval(countDown, 1000);
  	};

  	//the final countdown function 
  	var countDown = function(){
  		if(thisRoundTime === 0){
  			if(thisIntervalTime === 0){
  				//Time is indexed to 0, number of times counted indexed to 1
  				if(thisRoundNumber === 1){
  					endCountDown();
  				}else{
  					countDownRound();
  				}
  			}else{
  				countDownInterval();
  			}
  		}else{
  			countDownTime();
  		}
  		$scope.$apply();
  	};

  	//Function when the countdown is finished
  	var endCountDown = function(){
			clearInterval(countdownTimer);
  	};

  	//function for counting down the value of the time
  	//TODO add error checking on these three
  	var countDownTime = function(){
  		thisRoundTime -= 1;
  		timePassed += 1;
  	};

  	//Function for counting down the value of the interval
		var countDownInterval = function(){
  		thisIntervalTime -= 1;
  		timePassed += 1;
  	};

  	// Fucntion for counting down the value of the round
		var countDownRound = function(){
  		thisRoundNumber -= 1;
  		thisRoundTime = $scope.roundTime - 1;
  		thisIntervalTime = $scope.intervalTime;
  		timePassed += 1;
  	};


  	///////////// Misc Functions /////////////

  	$scope.getThisRoundTime = function(){
  		return thisRoundTime;
  	};

  	$scope.getThisIntervalTime = function(){
  		return thisIntervalTime;
  	};

  	$scope.getThisRoundNumber = function(){
  		return thisRoundNumber;
  	};

  });
