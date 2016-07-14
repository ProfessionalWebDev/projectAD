// usedIn : saveUser
exports.saveUser = function(body, app, callback){
	console.log("In Save",body);
	var user = new app.schema.users(body);
	user.save(body,function(err,docs){
		console.log("docs: ",docs);
		callback(err, docs);
	});
};