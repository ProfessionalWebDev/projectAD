exports=module.exports = function (app, mongoose) {
	//console.log("Inside surgeryDiseaseSchema");
	var surgeryDiseaseSchema = mongoose.Schema({
		name: String,
		wikiURL: String,
		numberOfPets: Number,
		serveSubTypeId: {type: mongoose.Schema.Types.Number, ref: 'servSubTypes'},
		petTypeId: {type: mongoose.Schema.Types.Number, ref: 'petTypes'},		
	});
	var surgeriesDiseases = mongoose.model('surgeriesDiseases', surgeryDiseaseSchema);
		surgeryDiseaseSchema.plugin(autoIncrement.plugin, 'surgeriesDiseases');
		
		app.schema.surgeriesDiseases = surgeriesDiseases;
};





