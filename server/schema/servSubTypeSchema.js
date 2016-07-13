exports=module.exports = function (app, mongoose) {
	//console.log("Inside servSubTypeSchema");
	var servSubTypeSchema = mongoose.Schema({
		subTypeName: String,
		servTypeId: [{type: mongoose.Schema.Types.Number, ref: 'servSubTypes'}],
		qualificationId: [{type: mongoose.Schema.Types.Number, ref: 'qualifications'}],
		numberOfServiceProviders: Number
	});
	var servSubTypes = mongoose.model('servSubTypes', servSubTypeSchema);
		servSubTypeSchema.plugin(autoIncrement.plugin, 'servSubTypes');
		
		app.schema.servSubTypes = servSubTypes;
};





