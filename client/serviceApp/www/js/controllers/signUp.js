serveApp.controller('signupCtrl', ['$scope', '$state','$auth','API','dataService','Validator', function($scope,$state,$auth,API,dataService,Validator){
	$scope.servPro = {};
	console.log("I am in signup controller!!! ");	
	$scope.signup = function(){
		dataService.setData($scope.servPro);
		var otpData = {
			email : $scope.servPro.spEmail,
			phone : $scope.servPro.spPhone,
			type : "sp"
		};
		API.postOne('/otpcreation',otpData).success(function(response){
			console.log("OTP RESPONSE: ",response);
			if(response.data.msg == "sent"){
				console.log($scope.servPro);
				$state.go('otp');
			}			
		});

		
	}
		$scope.nameValidator = function(name) {
			 return Validator.nameValidator(name);
		};
		
		$scope.emailValidator = function(email) {
			return Validator.emailValidator(email);
		};
		
		$scope.phoneValidator = function(phoneNo) {
			return Validator.phoneValidator(phoneNo);
		};
		
		$scope.passwordValidator = function(password) {
			return Validator.passwordValidator(password);
		};
		
		$scope.confirmPasswordValidator = function(confirmPassword, password) {
			if(password == confirmPassword){
				return true;
			} else {
				return "Passwords do not match.";
			}
			
		};
}]);