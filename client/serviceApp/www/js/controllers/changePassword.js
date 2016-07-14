serveApp.controller('chanegePasswordCtrl', ['$scope', '$state','API', function($scope,$state,API){
	console.log("I am in changepass controller!!! ");
	$scope.provider = $state.current.name;
}]);