module.exports = function (app){
	//console.log("Inside Routes");
	// declare body parser
	var bodyParser = require('body-parser');
	// parse application/json
	app.use(bodyParser.json());
	
	/* <<<<<< LIST OF ROUTES >>>>>>>  */
	
	//DEMO ROUTES >>>>>>>>
	// Demo Routes are listed here ........	
	
	app.get('/', function(req, res){
		console.log("Getting Request in /")
		res.json({"message":"ProjectAD"});
	});
	
	app.post('/api/saveUser', require('./demo/api/demoApi/demoApi').saveUser);
	
	
	//GENERAL ROUTES >>>>>>>>>
	// General Routes are listed here .......
	app.post('/auth/signup', require('./projectAD/general/generalApi.js').SignUp);
	app.post('/auth/login', require('./projectAD/general/generalApi.js').Login);
	
	
	
	//ADMIN ROUTES >>>>>>>>
	// Admin Routes are listed here ........	
	
	
	
	//USER ROUTES >>>>>>>>
	// User Routes are listed here ........
	
	
	
	//SERVICE PROVIDER ROUTES >>>>>>>>>
	// Service Provider Routes are listed here .......
	
	
	
	//SERVICE CONNECTION ROUTES >>>>>>>>
	// Server Connection Routes are listed here ......
	
	
	
	//USER CONNECTION ROUTES >>>>>>>>>>
	// User Connection Routes are listed here .......
	
	
	
};
