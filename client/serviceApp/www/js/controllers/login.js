serveApp.controller('loginCtrl', ['$scope','$state','$auth' ,'API','Validator', function($scope,$state,$auth,API,Validator){
	$scope.servPro = {};
	console.log("I am in login controller!!! ");
	$scope.feildCheck = function() {
		$scope.servPro = {};
		if($scope.spEmailOrPhone != null){
			if(Validator.emailValidator($scope.spEmailOrPhone) == true){
				$scope.servPro.spEmail = $scope.spEmailOrPhone;
			} else if(Validator.phoneValidator($scope.spEmailOrPhone) == true){
				$scope.servPro.spPhone = $scope.spEmailOrPhone;
			} else {
				return "Invalid Credentials";
			}
			return true;
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
		$scope.emailValidator = function(email) {
			return Validator.emailValidator(email);
		};
		
		$scope.phoneValidator = function(phoneNo) {
			return Validator.phoneValidator(phoneNo);
		};
		
		/*$scope.passwordValidator = function(password) {
			return Validator.passwordValidator(password);
		};*/
	
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