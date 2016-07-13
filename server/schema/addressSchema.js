exports=module.exports = function (app, mongoose) {
	//console.log("Inside addressSchema");
	var addressSchema = mongoose.Schema({
		fullAddress: String,
		line1: String,
		line2: String,
		line3: String,
		city: String,
		state: String,
		country: String,
		zipCode: Number,
		loc: {
			latitude: Number,
			longitude: Number
		}
	});
	var address = mongoose.model('address', addressSchema);
		addressSchema.plugin(autoIncrement.plugin, 'address');
		
		app.schema.address = address;
};





