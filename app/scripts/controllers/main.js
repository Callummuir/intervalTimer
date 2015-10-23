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

  	//audio
  	var pointAudioPlayedInRound = false;
  	var endAudio = new Audio('audio/endBeep.wav');
  	var pointAudio = new Audio('audio/partBeep.wav');

  	//Show/hide variable for buttons
  	$scope.showStartButton = true;
  	$scope.showResetButton = true;
  	$scope.showPauseButton = false;
  	$scope.showStopButton = false;
  	$scope.showRestartButton = false;

  	$scope.showDisplay = false;
  	$scope.showInput = true;


  	//Calculates the total amount of time to display
  	$scope.total = function(){
  	  return (($scope.roundTime + $scope.intervalTime) * $scope.roundNumber) - timePassed;	
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
  		thisRoundTime = $scope.roundTime;
  		thisIntervalTime = $scope.intervalTime;
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
  		stopEndAudio();
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
  		stopEndAudio();

  	};

  	//Function for reset button is pressed
  	$scope.resetButtonPress = function(){
  		//Change Display


  		//Functiom
  		$scope.roundTime = 0;
  		$scope.intervalTime = 0;
  		$scope.roundNumber = 1;
  		timePassed = 0;
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
  		countdownTimer = setInterval(countDown, 1000);
  	};

  	//the final countdown function 
  	var countDown = function(){
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
  		return thisRoundTime;
  	};

  	$scope.getThisIntervalTime = function(){
  		return thisIntervalTime;
  	};

  	$scope.getThisRoundNumber = function(){
  		return thisRoundNumber;
  	};

  });
