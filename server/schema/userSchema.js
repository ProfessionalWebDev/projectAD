exports=module.exports = function (app, mongoose) {
	//console.log("Inside userSchema");
	var userSchema = mongoose.Schema({
		userFirstName: {type: String, default: ""},
		userLastName: {type: String, default: ""},
		userFullName: {type: String, default: ""},
		userEmail: String,
		userPhone: Number,
		userProfilePicURL: String,
		userVideoURL: String,
		userAddress: {type: mongoose.Schema.Types.Number, ref: 'address'},
		userLoc: {
			latitude: Number,
			longitude: Number
		},
		pets: [{type: mongoose.Schema.Types.Number, ref: 'pets'}],
		mating: [{type: mongoose.Schema.Types.Number, ref: 'userConnections'}],
		serviceConnection: [{type: mongoose.Schema.Types.Number, ref: 'sericeConnections'}],
		desc: {type: String, default: ""},
		adoption: [{type: mongoose.Schema.Types.Number, ref: 'userConnections'}],
		dob: Date,
		gender: {type: mongoose.Schema.Types.Number, ref: 'generalLists'},
		bankName: String,
		accountHolderName: String,
		accountNumber: Number,
		isfcCode: String,
		ads: {type: mongoose.Schema.Types.Number, ref: 'ads'},
		terms: Boolean, // terms and condition accepted
		dateCreated: {type: Date, default: new Date()},
		lastModified: {type: Date, default: new Date()}
	});
	var users = mongoose.model('users', userSchema);
		userSchema.plugin(autoIncrement.plugin, 'users');
		
		app.schema.users = users;
};





