projectAD.controller('testCtrl', ['$scope','API', function($scope,API){
	console.log("I am in controller!!! ");
	
	// onLoad
	API.getAll('/').success(function(response){
		$scope.name = response.message + "!!! CLIENT AND SERVER IS CONNECTED";
	});
	
	// onclick of Save
	$scope.save = function(){
		console.log("Save Function: ",$scope.user);
		API.saveItem('/api/saveUser', $scope.user).success(function(response){
			if(response.message == 'success'){
				$scope.name = "SAVED SUCCESSFULLY!!! CLIENT, SERVER AND MONGODB IS CONNECTED"
				console.log("RESPONSE: ",response);
			}
		});
	}
}]);