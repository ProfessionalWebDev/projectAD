exports=module.exports = function (app, mongoose) {
	//console.log("Inside servTypeSchema");
	var servTypeSchema = mongoose.Schema({
		typeName: String,
		subTypeId: [{type: mongoose.Schema.Types.Number, ref: 'servSubTypes'}],
		qualificationId: [{type: mongoose.Schema.Types.Number, ref: 'qualifications'}],
		numberOfServiceProviders: Number
	});
	var servTypes = mongoose.model('servTypes', servTypeSchema);
		servTypeSchema.plugin(autoIncrement.plugin, 'servTypes');
		
		app.schema.servTypes = servTypes;
};





