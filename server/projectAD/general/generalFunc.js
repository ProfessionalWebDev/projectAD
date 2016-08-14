var rand = require('csprng');
var crypto = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');
var otp = require('otplib/lib/totp');

exports.otpGeneation = function(app, callback){
	console.log("otpgen");	
	// user secret key 
	var secret = otp.utils.generateSecret();
	console.log("secret",secret)
	// OTP code
	var code = otp.generate(secret);
	console.log("CODE",code);
	callback("",code);
};

exports.sendSms = function(data,app, callback){
	var twilioApi = require('twilio/lib/')(app.config.TWILIO_ACCOUNT_SID,app.config.TWILIO_AUTH_TOKEN);
	// TWILIO IMPLEMENTATION
	twilioApi.sendMessage({
		
		//Remove the above line after we buy twilio
		to: '+919900185890',
		//Replace with the line below
		//to: data.to,
		from: app.config.TWILIO_PHONE_NUMBER,    
		body: data.message,
	},
	function(error, message) {
    if (error) {
		console.log('Oops! There was an error.',error);		
    } else {
        //if success -->
		callback("",{'msg' : 'sent'});		
    }
	});
};


exports.checkExistingWithPhoneOrEmail = function(body, app, callback){
	console.log("BODY: ",body);
	if(typeof body.email == "undefined"){
		body.email = "";
	} 
	if(typeof body.phone == "undefined"){
		body.phone = "";
	}
	body.collection.find({$or:[{[body.emailKey] : body.email},{[body.phoneKey] : body.phone}]},  function(err, data) {
	   if(err){
		  console.log("Error: ", err);
		  callback(err, "");
	   }
	  if(data.length > 0){
		 callback("",{'msg' : "exist", 'data' : data});
	  }else{
		 callback("",{'msg' : "notExist"});
	  }            
   });
};

exports.hashingFunction = function(inputString, salt, app, callback){
	var temp;
	if(salt == "dummy"){
		temp = rand(160, 36);
	} else {
		console.log("SALT:",salt)
		temp = salt;
	}
    var newString = temp + inputString;
	var hashedString = crypto.createHash('sha512').update(newString).digest("hex");
	callback("",{'msg' : 'hashCreated', 'hashedString' : hashedString, 'salt' : temp})
};

exports.createDocument = function(toSaveBody, collection, app, callback){
	var newDoc = new collection(toSaveBody);
	newDoc.save(function(err, doc){
		if(err){
		  console.log("Error: ", err);
		  callback(err, "");
	   } else {
		   callback("", {'msg' : "created", 'data' : doc});
	   }
	});
}

exports.updateOrUpsert = function(uniqueID, toSaveBody, collection, app, callback){
	console.log("TOSAVEBODY",toSaveBody)
	collection.findOneAndUpdate({[uniqueID.key] : uniqueID.value}, toSaveBody, {"new":true, "upsert":true}, function(err, doc){   // toDo: Sometimes gives error .. to check again
	   if(err){
		  console.log("Error: ", err);
		  callback(err, "");
	   } else {
		   console.log("Doc: ",doc)
		   if(doc){
			   callback("", {'msg' : "created", 'data' : doc});
		   } else {
			   callback("Not Created","");
		   }		   
	   }
	});
};


exports.createJWT = function(inputObject, app, callback){
	var payload = {
        sub: inputObject._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
	callback("", jwt.encode(payload, app.config.TOKEN_SECRET));
};


exports.getOtp = function(phoneNumber, app, callback){
	app.schema.otps.find({phoneNumber: phoneNumber}, function(err, otpData){
		//console.log("otp data: ",otpData);
		if(err){
			callback(err, "");
		} else {
			callback("", otpData[0]);
		}		
	})
};

exports.compareDateWithCurrentDate = function(inputDate, app, callback){
	var currentDate = new Date();
	//var m = moment.isBefore('2014-07-14');
	console.log("Current Date: ",currentDate);
	console.log("Input Date: ",inputDate);
	//console.log("M value: ",m);
	
	if(currentDate.getTime() > inputDate.getTime()){ // toDo: check the logic again .. 
		console.log("past");
		callback("","past");
	} else {
		console.log("future");
		callback("","future");
	}
	
};