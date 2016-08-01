serveApp.controller('loginCtrl', ['$scope','$state','$auth' ,'API', function($scope,$state,$auth,API){
	$scope.servPro = {};
	console.log("I am in login controller!!! ");
	$scope.feildCheck = function() {
		$scope.servPro = {};
		if($scope.spEmailOrPhone != null){
			if(($scope.spEmailOrPhone).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
				console.log("EMAIL");
				$scope.servPro.spEmail = $scope.spEmailOrPhone;
			} else if(($scope.spEmailOrPhone).match(/(^((\+\d{1,2}|1)[\s.-]?)?\(?[2-9](?!11)\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^$)/)){
				console.log("PHONE");
				$scope.servPro.spPhone = $scope.spEmailOrPhone;
			} else {
				console.log("INVALID");
			}
		}		
	};
	$scope.login = function() {
		console.log("In LOGIN",$scope.servPro);
	  $auth.login($scope.servPro, {
                    params: {
                        "type": "sp"
                    }
                })
		.then(function(response) {
			console.log("Login resp: ",response.data);
			if(response.data.token){
				$state.go('app.home');
			}
			// Redirect user here to login page or perhaps some other intermediate page
			// that requires email address verification before any other part of the site
			// can be accessed.
		  })
		  .catch(function(response) {
			// Handle errors here.
		  });
	};	
	
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		  .then(function() {
			console.log("AUTH!!");
		  })
		  .catch(function(error) {
			if (error.error) {
				
			} else if (error.data) {
				
			} else {
				
			}
		  });
	  };	
}]);