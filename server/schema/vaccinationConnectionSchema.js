exports=module.exports = function (app, mongoose) {
	//console.log("Inside vaccinationConnectionSchema");
	var vaccinationConnectionSchema = mongoose.Schema({
		vaccinationId: {type: mongoose.Schema.Types.Number, ref: 'vaccinations'},
		petId: {type: mongoose.Schema.Types.Number, ref: 'pets'},
		dateOfVaccination: [Date],
		lastDateOfVaccination: Date,
		nextDateOfVaccination: Date,
		noOfDaysLeft: Number
	});
	var vaccinationConnections = mongoose.model('vaccinationConnections', vaccinationConnectionSchema);
		vaccinationConnectionSchema.plugin(autoIncrement.plugin, 'vaccinationConnections');
		
		app.schema.vaccinationConnections = vaccinationConnections;
};





