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
		$scope.formData = {};
		
		$scope.clearForm = function(){
			this.formData = "";
			}

		$scope.afterSaveUser = function(data){
			if(data == "true"){
					$scope.getUsers(); 
				}
				$scope.clearForm();
		}
		
		
		$scope.saveUser = function(){
			$http({
			method: 'POST',
			params: {
						username: this.formData.username,
						contact: this.formData.contact, 
					},
			url: 'services/saveuser.php'}).success($scope.afterSaveUser);		
			
		}
		
//====Delete user service===============================================================================/
		
		$scope.afterDeleteUser = function(userId){
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
					}).success(function(data){$scope.afterDeleteUser(userId)});
			  }	 
		}
		
		
			
	}]) //UsersGetController ended
 
})();





