var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.otpCreation = function(req, res){
	console.log("in otp general",req.body);
	var eventEmitter = new events.EventEmitter();
	var roleType = req.body.type;
	
	eventEmitter.on('checkIfExisting', function(otpData){
		req.app.general.checkExistingWithPhoneOrEmail(otpData, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN CHECKING EXISTING DATA (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After checkExistingWithPhoneOrEmail: ",resp);
					if(resp.msg == "exist"){
					res.json({'message' : "Account Already Exists !!" , 'data' : resp});
					} else{
						eventEmitter.emit('generateOtp', otpData);
					}
				}
		});	
	});
	
	eventEmitter.on('generateOtp', function(otpData){
		req.app.general.otpGeneation(req.app, function(err, otp){ 
				if(err){
					console.log("ERROR IN GENERATING OTP (OTP CREATION): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After otpGeneation: ",otp);
					var newOtpDoc = {
						phoneNumber : otpData.phone,
						otpNumber : otp,
						expireTime : Date.now() + req.app.config.otpExpiryTime
					};
					eventEmitter.emit('saveOtp',newOtpDoc);
				}
		});	
	});
	
	eventEmitter.on('saveOtp', function(newOtpDoc){		
		var uniqueID = {
			key : "phoneNumber",
			value : newOtpDoc.phoneNumber
		};
		req.app.general.updateOrUpsert(uniqueID, newOtpDoc, req.app.schema.otps, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN SAVING DOCUMENT (OTP CREATION): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After createDocument: ",resp);
					eventEmitter.emit('sendOtpMessage',resp.data);
				}
		});
	});
	
	eventEmitter.on('sendOtpMessage', function(otpDoc){
		req.app.general.sendSms(req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN SENDING MESSAGE (OTP CREATION): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After sendSms: ",resp);
					if(resp.msg == "sent"){
						var otpResponse = {'msg' : "sent", 'code': otpDoc.otpNumber};
						res.json({'message' : "SMS Sent" , 'data' : otpResponse});
					} else{
						res.json({'message' : "Error sending SMS. Retry Again!" , 'data' : {'msg' : "sent", 'code': otpDoc.otpNumber}});
					}
				}
		});	
	});
	
	if(roleType == "sp"){
		var otpData = {
			phone : req.body.phone,
			email : req.body.email,
			phoneKey : "phone",
			emailKey : "email",
			collection : req.app.schema.serviceProviders
		};
		eventEmitter.emit('checkIfExisting', otpData);
	}	
}

exports.otpValidation = function(req, res){
	console.log("INSIDE otpValidation",req.body);
	// toDo : validation
};

exports.SignUp = function(req, res){
	console.log("in sign up general: ",req.query, req.body);
	var eventEmitter = new events.EventEmitter();
	var roleType = req.query.type;		
	
	eventEmitter.on('hashThePass', function(signUpData){
		req.app.general.hashingFunction(signUpData.password,"dummy", req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN HASHING PASSWORD (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After hashingFunction: ",resp);
					signUpData.hashedPassword = resp.hashedString;
					signUpData.salt = resp.salt;
					//console.log("SignUp data: ",signUpData);
					eventEmitter.emit('saveData', signUpData);
				}
		});
	});
	
	eventEmitter.on('saveData', function(signUpData){
		var saveData = {
			[signUpData.firstNameKey] : signUpData.firstName,
			[signUpData.lastNameKey] : signUpData.lastName,
			[signUpData.emailKey] : signUpData.email,
			[signUpData.phoneKey] : signUpData.phone,
			hashedPassword : signUpData.hashedPassword,
			salt : signUpData.salt
		};
		req.app.general.createDocument(saveData, signUpData.collection, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN SAVING DOCUMENT (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After createDocument: ",resp);
					eventEmitter.emit('createJWT', resp, signUpData.loginType);
				}
		});
	});
	
	eventEmitter.on('createJWT', function(newDocument, loginType){
		req.app.general.createJWT(newDocument, req.app, function(err, token){ 
				if(err){
					console.log("ERROR IN GENERATING TOKEN (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					res.json({'token' : token, 'data' : newDocument, 'loginType' : loginType});
				}
		});
	});
	
	var signUpData = {};
	if(roleType == "sp"){
		signUpData = {
			loginType: roleType,
			firstName : req.body.spFirstName,
			lastName : req.body.spLastName,
			phone : req.body.spPhone,
			password : req.body.password,
			email : req.body.spEmail.toLowerCase(),
			firstNameKey : "spFirstName",
			lastNameKey : "spLastName",
			phoneKey : "spPhone",
			emailKey : "spEmail",
			collection : req.app.schema.serviceProviders
		};	
		eventEmitter.emit('hashThePass', signUpData);
	}		
};

exports.Login = function(req, res){
	console.log("in login general: ",req.query, req.body);
	var eventEmitter = new events.EventEmitter();
	var roleType = req.query.type;	
	
	eventEmitter.on('checkIfExisting', function(loginData){
		req.app.general.checkExistingWithPhoneOrEmail(loginData, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN CHECKING EXISTING DATA (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After checkExistingWithPhoneOrEmail: ",resp);
					if(resp.msg == "exist"){
						var loginType = loginData.loginType;
						var newPass = loginData.password;
						loginData = {};
						loginData = resp.data[0];
						eventEmitter.emit('hashThePass', loginData, newPass, loginType);
					} else{
						res.json({'message' : "Account Does Not Exists !!" , 'data' : resp});
					}
				}
		});	
	});
	
	eventEmitter.on('hashThePass', function(loginData, newPass, loginType){
		console.log("LOGINDATA",loginData.hashedPassword);
		req.app.general.hashingFunction(newPass,loginData.salt, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN HASHING PASSWORD (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("Hash Resp",resp.hashedString);
					if(resp.hashedString == loginData.hashedPassword){
						console.log("success login");
						eventEmitter.emit('createJWT', loginData, loginType);
					} else {
						console.log("failed login");
						res.json({'message' : "Invalid Password."});
					}
				}
		});
	});
	
	eventEmitter.on('createJWT', function(newDocument, loginType){
		req.app.general.createJWT(newDocument, req.app, function(err, token){ 
				if(err){
					console.log("ERROR IN GENERATING TOKEN (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("TOKEN CREATED");
					res.json({'token' : token, 'data' : newDocument, 'loginType' : loginType});
				}
		});
	});
	
	if(roleType == "sp"){
		var loginData = {
			loginType: roleType,
			password : req.body.password,
			phoneKey : "spPhone",
			emailKey : "spEmail",
			collection : req.app.schema.serviceProviders
		};
		if(typeof req.body.spEmail === "undefined"){
			//console.log("INSIDE PHONE");
			loginData.loginWith = "phone";
			loginData.phone = req.body.spPhone;			
		} else if(typeof req.body.spPhone === "undefined"){
			//console.log("INSIDE EMAIL");
			loginData.loginWith = "email";
			loginData.email = req.body.spEmail;
		} else {
			res.json({'message' : "Invalid Input"});
		}			
		//console.log("LOGIN DATA: ",loginData);
		eventEmitter.emit('checkIfExisting', loginData);
	}	
}