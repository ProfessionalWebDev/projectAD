exports=module.exports = function (app, mongoose) {
	//console.log("Inside bloodGroupSchema");
	var bloodGroupSchema = mongoose.Schema({
		groupName: String,
		numberOfPets: Number,
		wikiURL: String
	});
	var bloodGroups = mongoose.model('bloodGroups', bloodGroupSchema);
		bloodGroupSchema.plugin(autoIncrement.plugin, 'bloodGroups');
		
		app.schema.bloodGroups = bloodGroups;
};





