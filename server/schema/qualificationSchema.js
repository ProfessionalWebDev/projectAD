exports=module.exports = function (app, mongoose) {
	//console.log("Inside qualificationSchema");
	var qualificationSchema = mongoose.Schema({
		name: String,
		subject: String,
		wikiIURL: String,
		desc: String,
		servSubTypeId: [{type: mongoose.Schema.Types.Number, ref: 'servSubTypes'}],
		servTypeId: [{type: mongoose.Schema.Types.Number, ref: 'qualifications'}],
		numberOfServiceProviders: Number
	});
	var qualifications = mongoose.model('qualifications', qualificationSchema);
		qualificationSchema.plugin(autoIncrement.plugin, 'qualifications');
		
		app.schema.qualifications = qualifications;
};





