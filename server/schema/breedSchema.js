exports=module.exports = function (app, mongoose) {
	//console.log("Inside breedSchema");
	var breedSchema = mongoose.Schema({
		breedName: String,
		petTypeId: {type: mongoose.Schema.Types.Number, ref: 'petTypes'},
		wikiURL: String,
		numberOfPets: Number,
		status: {type: mongoose.Schema.Types.Number, ref: 'status'} // active / inactive
	});
	var breeds = mongoose.model('breeds', breedSchema);
		breedSchema.plugin(autoIncrement.plugin, 'breeds');
		
		app.schema.breeds = breeds;
};





