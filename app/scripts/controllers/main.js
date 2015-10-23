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

  	// stores to worker object
  	var timeWorker = null;

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
  		//if workers are supported
  		if(typeof(Worker) !== "undefined"){
  			// If we do not have a worker created already
  			if(timeWorker === null){
  				timeWorker = new Worker("scripts/timerWorker.js");
  				console.log(timeWorker);
  			}
  			// timeWorker.timeWorkerStart();


  			//TODO update the data held here

  		}else{
  			//TODO Error message
  		}
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
  					//TODO
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

  	//Ends the timer
  	var endTimer = function(){
  		timerWorker.terminate();
  		timeWorker = null;
  	};

  	//Function when the countdown is finished
  	var endCountDown = function(){
  		//TODO
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

  	// Function for counting down the value of the round
		var countDownRound = function(){
  		thisRoundNumber -= 1;
  		thisRoundTime = $scope.roundTime - 1;
  		thisIntervalTime = $scope.intervalTime;
  		timePassed += 1;
  		pointAudioPlayedInRound = false;
  	};

  	//Play Audio functions
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
