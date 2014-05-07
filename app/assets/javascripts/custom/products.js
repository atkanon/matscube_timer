// Whole Application module
var AppModule = angular.module('App', []);

AppModule.controller('AppController', function($scope) {
	$scope.KeyUp = function(keyEvent) {
		console.log('keyup', keyEvent.keyCode);
	};
	$scope.KeyDown = function(keyEvent) {
		console.log('keydown', keyEvent.keyCode);
	};

	// Rubik's cube timer module
	var RubikModule = angular.module('Rubik', []);

	RubikModule.controller('TimerController', function($scope, $timeout) {
		$scope.time = {
			counter: 0,
			minutes: "00",
			seconds: "00",
			milliseconds: "00" };

		$scope.onTimeout = function() {
			var counter = $scope.time.counter++;

			$scope.time.milliseconds = number_format(counter % 100, 2);
			$scope.time.seconds = number_format(Math.floor(counter / 100) % 60, 2);
			$scope.time.minutes = number_format(Math.floor(counter / 100 / 60) % 10, 2);

			$timeout($scope.onTimeout, 10);
		};

		function number_format(number, digit) {
			return ('000' + number).slice(-digit);
		}
	});
});

