exports=module.exports = function (app, mongoose) {
	//console.log("Inside serviceConnectionsSchema");
	var serviceConnectionSchema = mongoose.Schema({
		petId: [{type: mongoose.Schema.Types.Number, ref: 'pets'}],
		userId: {type: mongoose.Schema.Types.Number, ref: 'users'},
		serviceProviderId: {type: mongoose.Schema.Types.Number, ref: 'serviceProviders'},
		review: String, 
		vote: Boolean,
		socialShares: [{type: mongoose.Schema.Types.Number, ref: 'scoialMedias'}]
	});
	var serviceConnections = mongoose.model('serviceConnections', serviceConnectionSchema);
		serviceConnectionSchema.plugin(autoIncrement.plugin, 'serviceConnections');
		
		app.schema.serviceConnections = serviceConnections;
};





