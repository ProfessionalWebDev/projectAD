exports=module.exports = function (app, mongoose) {
	//console.log("Inside serviceProviderSchema");
	var serviceProviderSchema = mongoose.Schema({
		spFirstName: {type: String, default: ""},
		spLastName: {type: String, default: ""},
		spEmail: String,
		spPhone: Number,
		spProfilePicURL: String,
		spVideoURL: String,
		spAddress: {type: mongoose.Schema.Types.Number, ref: 'address'}, // Residence Address
		spLoc: {
			latitude: Number,
			longitude: Number
		},
		serveTypeId: {type: mongoose.Schema.Types.Number, ref: 'servTypes'},
		serveSubTypeId: {type: mongoose.Schema.Types.Number, ref: 'servSubTypes'},
		qualification: {type: mongoose.Schema.Types.Number, ref: 'qualifications'},
		yearsOfExperience: Number,
		achievements: String,
		vaccinationConnectionId: {type: mongoose.Schema.Types.Number, ref:'vaccinationConnections'},
		desc: String,
		stores: [{type: mongoose.Schema.Types.Number, ref: 'stores'}],
		serviceConnection: [{type: mongoose.Schema.Types.Number, ref: 'sericeConnections'}],
		desc: {type: String, default: ""},
		dob: Date,
		gender: {type: mongoose.Schema.Types.Number, ref: 'generalLists'},
		verificationStatus: {type: mongoose.Schema.Types.Number, ref: 'status'},
		averageRating: {type: mongoose.Schema.Types.Number, ref: 'ratings'},
		numberOfViews: Number,
		identificationNumber: String,
		verificationCounter: Number,
		verificationComment: String,
		bankName: String,
		accountHolderName: String,
		accountNumber: Number,
		isfcCode: String,
		ads: {type: mongoose.Schema.Types.Number, ref: 'ads'},
		terms: Boolean, // terms and condition accepted
	});
	var serviceProviders = mongoose.model('serviceProviders', serviceProviderSchema);
		serviceProviderSchema.plugin(autoIncrement.plugin, 'serviceProviders');
		
		app.schema.serviceProviders = serviceProviders;
};





