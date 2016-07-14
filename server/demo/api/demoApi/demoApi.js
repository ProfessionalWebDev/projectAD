// API URL --> /api/saveUser
exports.saveUser = function(req, res){
	req.app.demo.saveUser(req.body, req.app, function(err, data){ // demo/demo.js
		if(err){
			res.json({'message': "failed"});
		} else {
			res.json({'user':data, 'message':"success"});
		}
	});	
}
