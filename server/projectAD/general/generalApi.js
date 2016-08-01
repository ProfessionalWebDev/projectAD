var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.SignUp = function(req, res){
	console.log("in sign up general: ",req.query, req.body);
	var eventEmitter = new events.EventEmitter();
	var roleType = req.query.type;	
	
	eventEmitter.on('checkIfExisting', function(signUpData){
		req.app.general.checkExistingWithPhoneOrEmail(signUpData, req.app, function(err, resp){ 
				if(err){
					console.log("ERROR IN CHECKING EXISTING DATA (SIGN UP): ",err);
					res.json({'message' : "Sorry, Unexpected Error, Try Again."});
				} else {
					console.log("After checkExistingWithPhoneOrEmail: ",resp);
					if(resp.msg == "exist"){
					res.json({'message' : "Account Already Exists !!" , 'data' : resp});
					} else{
						eventEmitter.emit('hashThePass', signUpData);
					}
				}
		});	
	});
	
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
		eventEmitter.emit('checkIfExisting', signUpData);
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