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

  	//state of the timer
  	var start = false;

  	//timer
  	var countdownTimer;


  	//Calculates the total amount of time to display
  	$scope.total = function(){
  		//if we have started show to countdown time
  		if(start){
  			return (thisRoundTime + thisIntervalTime) * thisRoundNumber;
  		}else{
  			return ($scope.roundTime + $scope.intervalTime) * $scope.roundNumber;	
  		}
  	};

		///////////// Button functions /////////////  	

  	//Function when the start button is pressed
  	$scope.startButtonPress = function(){
  		//Assign values to be counted down
  		thisRoundTime = $scope.roundTime;
  		thisIntervalTime = $scope.intervalTime;
  		thisRoundNumber = $scope.roundNumber;

  		//Change buttons and display
  		start = true;

  		//start (final)countdown
  		startCountDown();
  	};

  	//Function when the stop button is pressed
  	$scope.stopButtonPress = function(){
  		//Change buttons and display
  		start = false;
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
  		console.log("starting countdown");
  		countdownTimer = setInterval(countDown, 1000);
  	};

  	var countDown = function(){
  		console.log("one second");
  	};

  	//Function when the countdown is finished
  	var endCountDown = function(){
			clearInterval(countDown);
  	};

  	//function for counting down the value of the time
  	//TODO add error checking on these three
  	var countDownTime = function(){
  		console.log("count time");
  		$scope.roundTime -= 1;
  	};

  	//Function for counting down the value of the interval
		var countDownInterval = function(){
			console.log("count interval");
  		$scope.intervalTime -= 1;
  	};

  	// Fucntion for counting down the value of the round
		var countDownRound = function(){
			console.log("count round");
  		$scope.roundNumber -= 1;
  		$scope.roundTime = 10;
  		$scope.intervalTime = 10;
  	};






  });
