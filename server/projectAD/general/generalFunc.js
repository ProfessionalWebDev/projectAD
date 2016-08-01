var rand = require('csprng');
var crypto = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');

exports.checkExistingWithPhoneOrEmail = function(body, app, callback){
	console.log("BODY: ",body);
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

exports.createJWT = function(inputObject, app, callback){
	var payload = {
        sub: inputObject._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
	callback("", jwt.encode(payload, app.config.TOKEN_SECRET));
}