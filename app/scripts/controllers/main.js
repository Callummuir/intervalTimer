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

  	//Start time
  	var startTime = null;
  	var countdownTimer;

  	//Show/hide variable for buttons
  	$scope.showStartButton = true;
  	$scope.showResetButton = true;
  	$scope.showPauseButton = false;
  	$scope.showStopButton = false;
  	$scope.showRestartButton = false;

  	//audio
  	var pointAudioPlayedInRound = false;
  	var endAudio = new Audio('audio/endBeep.wav');
  	var pointAudio = new Audio('audio/partBeep.wav');

  	$scope.showDisplay = false;
  	$scope.showInput = true;


  	//Calculates the total amount of time to display
  	$scope.total = function(){
  	  return Math.round((($scope.roundTime / 1000) + ($scope.intervalTime / 1000)) * $scope.roundNumber) - (timePassed / 1000);	
  	};


  	///////////// Button functions /////////////  	

  	//Function when the start button is pressed
  	$scope.startButtonPress = function(){
  		//Change Display
  		$scope.showStartButton = false;
  		$scope.showResetButton = false;
  		$scope.showStopButton = true;
  		$scope.showPauseButton = true;

  		$scope.showDisplay = true;
  		$scope.showInput = false;

  		//Function
  		thisRoundTime = $scope.roundTime * 1000;
  		thisIntervalTime = $scope.intervalTime * 1000;
  		thisRoundNumber = $scope.roundNumber;
  		timePassed = 0;

  		startCountDown();
  	};

  	//Function when the stop button is pressed
  	$scope.stopButtonPress = function(){
  		//Change Display
  		$scope.showStartButton = true;
  		$scope.showResetButton = true;
  		$scope.showStopButton = false;
  		$scope.showPauseButton = false;
  		$scope.showRestartButton = false;

  		$scope.showDisplay = false;
  		$scope.showInput = true;

  		//Function
  		endCountDown();
  		$scope.roundTime = 0;
  		$scope.intervalTime = 0;
  		$scope.roundNumber = 1;
  		timePassed = 0;
  	};

  	//Function when the pause button is pressed
  	$scope.pauseButtonPress = function(){
  		//Change Display
  		$scope.showPauseButton = false;
  		$scope.showRestartButton = true;

  		//Function
  		endCountDown();
  	};

  	//Function for reset button is pressed
  	$scope.resetButtonPress = function(){
  		//Change Display

  		//Functiom
  		$scope.roundTime = 0;
  		$scope.intervalTime = 0;
  		$scope.roundNumber = 1;
  	};

  	//function for restarting the countdown after a pause
  	$scope.restartButtonPress = function(){
  		//Change Display
  		$scope.showPauseButton = true;
  		$scope.showRestartButton = false;

  		//Function
  		startCountDown();
  	};


  	///////////// Count functions /////////////

  	//Function for starting counting functionality
  	var startCountDown = function(){
  		//milliseconds since 
  		startTime = Date.now();

  		//require interval timer for updating the values
			countdownTimer = setInterval(findTimePassed, 50);
  	};

  	//find the real time passed
  	//Note this may be a bit off as we are counting second and not milliseconds. tempted to change this, but will be easy to fix later
  	var findTimePassed = function(){
  		var thisTime = Date.now();
  		var timePassed = thisTime - startTime;
  		startTime = thisTime;
  		countDown(timePassed);
  	};

  	//the final countdown function 
  	var countDown = function(timePassed){
  		//counts down one for each millisecond that has passed
  		for(var i = 0; i < timePassed; i++){
	  		if(thisRoundTime === 0){
	  			if(!pointAudioPlayedInRound){
	  				pointAudioPlayedInRound = true;
	  				playPartAudio();
	  			}
	  			if(thisIntervalTime === 0){
	  				if(pointAudioPlayedInRound){
	  					playPartAudio();
	  				}
	  				//Time is indexed to 0, number of times counted indexed to 1
	  				if(thisRoundNumber === 1){
							playEndAudio();
	  					endCountDown();
	  					break;
	  				}else{
	  					countDownRound();
	  				}
	  			}else{
	  				countDownInterval();
	  			}
	  		}else{
	  			countDownTime();
	  		}
	  	}
  		$scope.$apply();
  	};

  	//Function when the countdown is finished
  	var endCountDown = function(){
			clearInterval(countdownTimer);
			startTime = null;
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
  		thisRoundTime = $scope.roundTime * 1000;
  		thisIntervalTime = $scope.intervalTime * 1000;
  		timePassed += 1;
  		pointAudioPlayedInRound = false;
  	};


  	///////////// Audio Functions /////////////

  	var playEndAudio = function(){
			endAudio.play();
  	};

  	var playPartAudio = function(){
			pointAudio.play();
  	};

  	///////////// Misc Functions /////////////

  	$scope.getThisRoundTime = function(){
  		return Math.round(thisRoundTime / 1000);
  	};

  	$scope.getThisIntervalTime = function(){
  		return Math.round(thisIntervalTime / 1000);
  	};

  	$scope.getThisRoundNumber = function(){
  		return thisRoundNumber;
  	};

  });
