serveApp.controller('signupCtrl', ['$scope', '$state','API', function($scope,$state,API){
	console.log("I am in signup controller!!! ");
	$scope.signup = function(){
		$state.go('otp');		
	}
}]);