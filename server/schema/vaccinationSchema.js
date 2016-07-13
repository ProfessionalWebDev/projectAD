exports=module.exports = function (app, mongoose) {
	//console.log("Inside vaccinationSchema");
	var vaccinationSchema = mongoose.Schema({
		vaccinationName: String,
		wikiURL: String,
		petType: {type: mongoose.Schema.Types, ref: 'petTypes'},
		numberOfPets: Number,
		imageURL: String,
		intervalOfVaccination: Number
	});
	var vaccinations = mongoose.model('vaccinations', vaccinationSchema);
		vaccinationSchema.plugin(autoIncrement.plugin, 'vaccinations');
		
		app.schema.vaccinations = vaccinations;
};





