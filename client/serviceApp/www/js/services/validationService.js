serveApp.service('Validator', function () {
	this.nameValidator = function(name) {
		
		if(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name)) {
				return true;
			} else {
				return "Should be alphabets only.";
			}
	}    

	this.emailValidator = function(email) {
		if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
				return true;
			} else {
				return "Please enter valid email ID.";
			}
	}

	this.phoneValidator = function(phoneNo) {
		if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNo)) {
				return true;
			} else {
				return "Please enter valid phone number.";
			}
	}		
	this.passwordValidator = function(password) {
		if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)){
			return true;
		} else {
			return "Password must contain atleast 6 characters with one numeric, special character and Upper case.";
		}
	}
    	
});