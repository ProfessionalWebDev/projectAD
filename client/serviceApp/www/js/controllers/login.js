serveApp.controller('loginCtrl', ['$scope','$state' ,'API', function($scope,$state,API){
	console.log("I am in login controller!!! ");
	$scope.login = function(){
		$state.go('app.home');		
	}
}]);