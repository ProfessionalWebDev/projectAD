exports=module.exports = function (app, mongoose) {
	//console.log("Inside userConnectionSchema");
	var userConnectionSchema = mongoose.Schema({
		user1Id: {type: mongoose.Schema.Types.Number, ref: 'users'},
		user2Id: {type: mongoose.Schema.Types.Number, ref: 'users'},
		pet1Id: {type: mongoose.Schema.Types.Number, ref: 'pets'},
		pet2Id: {type: mongoose.Schema.Types.Number, ref: 'pets'},
		connectionType: String, // adoption / mating
		ad : {type: mongoose.Schema.Types.Number, ref: 'ads'},
		serviceProviderId: {type: mongoose.Schema.Types.Number, ref: 'serviceProviders'},
		status: {type: mongoose.Schema.Types.Number, ref: 'status'},
		matingType: String, // user / serviceProvider
		dateCreated: {type: Date, default: new Date()},
		lastModified: {type: Date, default: new Date()}
	});
	var userConnections = mongoose.model('userConnections', userConnectionSchema);
		userConnectionSchema.plugin(autoIncrement.plugin, 'userConnections');
		
		app.schema.userConnections = userConnections;
};





