serveApp.controller('chanegePasswordCtrl', ['$scope', '$state','$auth','API','dataService','ionicToast',function($scope,$state,$auth,API,dataService,ionicToast){
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
		
    // $scope.hideToast = function(){
	  // ionicToast.hide();
	// };	
	
	$scope.resendOtp = function(){		
		console.log("OTPDATA",otpData);
		API.postOne('/otpcreation',otpData).success(function(response){
			console.log("OTP RESPONSE: ",response);
			if(response.data.msg == "sent"){
				console.log("OTP IS RESENT");
				ionicToast.show('OTP has been resent to your device', 'middle', true, 2500000);
				
			}			
		});
	}	
	
	$scope.validateOtp = function(otpValue){
		if(otpValue.length == 6){
			console.log("OTP VALUE: ",otpValue);
			var otpValidation = {
				'phoneNumber' : $scope.spPhone,
				'otpValue' : otpValue
			};
			API.postOne('/otpvalidation',otpValidation).success(function(response){
				console.log("OTP RESPONSE: ",response);
				if(response.message == "success"){
					console.log("LOGIN SIGNUP!!");
					// toDo : siginUp AND login using Promise	
						$auth.signup($scope.servePro, {
							params: {
								"type": "sp"
							}
						})
						.then(function(response) {
							console.log("Signup resp: ",response.data);
							if(response.data.token){
								$state.go('login');
							}
							
							// Redirect user here to login page or perhaps some other intermediate page
							// that requires email address verification before any other part of the site
							// can be accessed.
						  })
						  .catch(function(response) {
							// Handle errors here.
						  });	
				} else if(response.message == "expired"){
					console.log("OTP EXPIRED");
				} else if(response.message == "wrong"){
					console.log("OTP WRONG");
				} else {
					console.log("UNEXPECTED ERROR");
				}			
			});
		}		
	}
	
}]);