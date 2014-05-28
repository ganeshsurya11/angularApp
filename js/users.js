	/*
	app.directive("productDescription", function() {
      return {
        restrict: '	',
        templateUrl: "template/product-description.html"
      };
    });
	*/

(function(){	
	var app =  angular.module("usersApp", []); // Module

	app.controller("UsersGetController", ['$scope', '$http', '$parse', function($scope, $http, $parse){	
	
//====Fetch All users from getusers service===============================================================================/
		$scope.getUsers = function(){
			$http({
				method: 'GET',
				url: "services/getusers.php",//service url,
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
				   $scope.users = data;
				}).error(function (response, data, status, header) {
				});//.then( function(response){  return response.data )  })
		}
 
		$scope.getUsers();	// Call get usrs service.
//====Ended Fetch All users from getusers service===============================================================================/
		
//====Save user service===============================================================================/
 		
		$scope.showFlashMsg = function(msg){
				$(".searchform .span12").append('<div class="alert">'+msg+'</div>');
				setTimeout(function(){ $(".alert").fadeOut() }, 4000);
			}
 	
		$scope.clearForm = function(){
			$scope.newuser = "";
			}
		
		$scope.afterSaveUser = function(data){
			if(data == "true"){
					$scope.showFlashMsg("User Saved successfully !");
					$scope.getUsers(); 
				}
				$scope.clearForm();
		}
		
		
		$scope.saveUser = function(){
			$scope.method = ($scope.newuser.id != null)? "PUT" : "POST";
			$http({
			method: $scope.method,
			params: {
						id: $scope.newuser.id,
						firstname: $scope.newuser.firstname,
						phone: $scope.newuser.phone, 
					},
			url: 'services/saveuser.php'}).success($scope.afterSaveUser);		
			
		}

//====Delete user service===============================================================================/
		$scope.editUser = function(id){
				for(i in $scope.users) {
					//alert($scope.users[0].id);
					if($scope.users[i].id == id) {
						//we use angular.copy() method to create
						//copy of original object
						$scope.newuser = $scope.users[i]; //angular.copy($scope.users[i]);

						console.log($scope.myuser);
						 
					}
				}
			}
		
//====Delete user service===============================================================================/
		
		$scope.afterDeleteUser = function(userId, data){
			$scope.showFlashMsg("User delete successfully !");
			 $('#usersTable tr[data-id="' + userId + '"]').fadeOut();
		}

		$scope.deleteUser = function(e){
			  var userId = $(e.target).data('id');
			  //alert($(e.target).data('test'));  works properly
			  if (confirm('Are you sure to delete?')) {
				$http({
						method: 'DELETE',
						params:{userId: userId},
						url: 'services/deletetuser.php'
					}).success(function(data){console.log(data); $scope.afterDeleteUser(userId)});
			  }	 
		}
		
		
			
	}]) //UsersGetController ended
 
})();





