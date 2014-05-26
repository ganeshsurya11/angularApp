	/*
	app.directive("productDescription", function() {
      return {
        restrict: '	',
        templateUrl: "template/product-description.html"
      };
    });
	*/


(function(){	
	var app =  angular.module("storeApp", []);
	
	
	 
	app.controller("StoreController", ['$scope', '$http', '$parse', function($scope, $http, $parse){	

	$scope.ganesh = "Suyrwansh";

	var m = $http({
        method: 'GET',
        url: "services/users.php",//service url,
        respondType: 'json',
       /* headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Access-Control-Allow-Credentials': true
        },
        params: {
            orderTypeCode: 948,
            transactionCode: 3
            }*/
        }).success(function (data, status, headers, config) {
           console.log(config);
		   $scope.users = data;
        }).error(function (response, data, status, header) {
        });//.then( function(response){  getmydata(response.data)  })
		
		
		
	 
	 
	 
		function getmydata(k){
				dd = k;
			}



		 
}])
 


	


})();





