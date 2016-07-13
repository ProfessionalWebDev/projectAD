exports=module.exports = function (app, mongoose) {
	//console.log("Inside generalListSchema");
	var generalListSchema = mongoose.Schema({
		name: String,
		listItems: [{
			value: String,
			desc: String,
			abbr: String,
			status: {type: mongoose.Schema.Types.Number, ref: 'status'} // active / inactive
		}]
	});
	var generalLists = mongoose.model('generalLists', generalListSchema);
		generalListSchema.plugin(autoIncrement.plugin, 'generalLists');
		
		app.schema.generalLists = generalLists;
};





