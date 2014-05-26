// JavaScript Document

var app = angular.module('mayApp', []);

/* THis is for 1.html file **************************************/
app.run(function($rootScope) {
  $rootScope.name = "Ari Lerner";
   $rootScope.person=["Ganesh"];
});

app.controller('MyController', function($scope) {
	
	$scope.person= "Rajesh";
	
	$scope.sayHello = function(){
		$scope.person= $scope.name;
	}
	//$scope.person= "Rajesh";
	
});
/* Ended THis is for 1.html file **************************************/



app.controller('TController', function($scope) {
	$scope.counter = 0;
	$scope.add = function(amount){
			$scope.counter += amount;
		}
});



/* THis is for 2.html file **************************************/

app.controller('MyController', function($scope) {
  $scope.person = { name: "Ari Lerner" };
  var updateClock = function() {
    $scope.clock = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});


/* THis is for 3.html file **************************************/
app.controller('DemoController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});


/* THis is for 4.html file **************************************/
app.controller('PreviewController', function($scope){
	$scope.username = "Ganesh";
	$scope.accept = false;
		$scope.city = "mumbai";
})



app.controller('PlayerController', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = '/media/npr.mp4';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });
}]);