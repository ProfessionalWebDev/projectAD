exports=module.exports = function (app, mongoose) {
	//console.log("Inside statusSchema");
	var statusSchema = mongoose.Schema({
		statusKeyword: String,
		statusForKeyword: String,
		displayName: String,
		desc: String,
		schemaModelName: String,
		numberOfDocuments: Number
	});
	var status = mongoose.model('status', statusSchema);
		statusSchema.plugin(autoIncrement.plugin, 'status');
		
		app.schema.status = status;
};





