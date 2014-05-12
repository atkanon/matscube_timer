var AppModule = angular.module('App', []);

AppModule.controller('AppController', function($scope, $timeout) {
	// Timerの制御
	$scope.timer = {
		status: 'off'
	};

	$scope.KeyUp = function(keyEvent) {
		if (keyEvent.keyCode == 32 && $scope.timer.status == 'off') {
			$scope.timer.status = 'on';
			$scope.onTimeout();
		}
		if ($scope.timer.status == 'finished') {
			$scope.timer.status = 'off';
		}
	};

	$scope.KeyDown = function(keyEvent) {
		if ($scope.timer.status == 'on') {
			$scope.timer.status = 'finished';
		}
		if (keyEvent.keyCode == 32 && $scope.timer.status == 'off') {
			// ready
		}
	};

	$scope.time = {
		counter: 0,
		minutes: "00",
		seconds: "00",
		milliseconds: "00"
	};

	$scope.onTimeout = function() {
		var counter = $scope.time.counter++;

		$scope.time.milliseconds = number_format(counter % 100, 2);
		$scope.time.seconds = number_format(Math.floor(counter / 100) % 60, 2);
		$scope.time.minutes = number_format(Math.floor(counter / 100 / 60) % 10, 2);

		if ($scope.timer.status == 'on') {
			$timeout($scope.onTimeout, 10);
		}
	};

	function number_format(number, digit) {
		return ('000' + number).slice(-digit);
	}

});

