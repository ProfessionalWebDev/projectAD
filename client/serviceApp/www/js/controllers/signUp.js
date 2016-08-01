serveApp.controller('signupCtrl', ['$scope', '$state','$auth','API', function($scope,$state,$auth,API){
	$scope.servPro = {};
	console.log("I am in signup controller!!! ");
	
	$scope.signup = function(){
		console.log($scope.servPro);
		$auth.signup($scope.servPro, {
                    params: {
                        "type": "sp"
                    }
                })
		.then(function(response) {
			console.log("Signup resp: ",response.data);
			if(response.data.token){
				$state.go('otp');
			}
			
			// Redirect user here to login page or perhaps some other intermediate page
			// that requires email address verification before any other part of the site
			// can be accessed.
		  })
		  .catch(function(response) {
			// Handle errors here.
		  });
			
			
	}
}]);