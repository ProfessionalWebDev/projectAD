exports=module.exports = function (app, mongoose) {
	//console.log("Inside petTypeSchema");
	var petTypeSchema = mongoose.Schema({
		typeName: String,
		status: {type: mongoose.Schema.Types.Number, ref: 'status'}, // active / inactive
		numberOfPets: Number,
		displayName: String		
	});
	var petTypes = mongoose.model('petTypes', petTypeSchema);
		petTypeSchema.plugin(autoIncrement.plugin, 'petTypes');
		
		app.schema.petTypes = petTypes;
};





