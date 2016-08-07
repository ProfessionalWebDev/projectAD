serveApp.controller('chanegePasswordCtrl', ['$scope', '$state','$auth','API','dataService', function($scope,$state,$auth,API,dataService){
	console.log("I am in changepass controller!!! ");
	$scope.provider = $state.current.name;
	$scope.servePro = dataService.getData();
	console.log("GOT DATA IN CHANGE PASS: ",$scope.servePro);
	$scope.spPhone = $scope.servePro.spPhone;
	var otpData = {
			email : $scope.servePro.spEmail,
			phone : $scope.servePro.spPhone,
			type : "sp"
		};
	
	$scope.resendOtp = function(){		
		console.log("OTPDATA",otpData);
		API.postOne('/otpcreation',otpData).success(function(response){
			console.log("OTP RESPONSE: ",response);
			if(response.data.msg == "sent"){
				console.log("OTP IS RESENT");
			}			
		});
	}	
	
	$scope.validateOtp = function(otpValue){
		if(otpValue.length == 6){
			console.log("OTP VALUE: ",otpValue);
			API.postOne('/otpvalidation',{'otpValue' : otpValue}).success(function(response){
				console.log("OTP RESPONSE: ",response);
				if(response.data.msg == "success"){
					// toDo : siginUp AND login using Promise													
				}			
			});
		}		
	}
	
}]);