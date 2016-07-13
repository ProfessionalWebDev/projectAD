exports=module.exports = function (app, mongoose) {
	//console.log("Inside storeSchema");
	var storeSchema = mongoose.Schema({
		serviceProviderId: {type: mongoose.Schema.Types.Number, ref: 'serviceProviders'},
		storeName: String,
		storePhone: Number,
		storeFaxNo: Number,
		storeAddress: {type: mongoose.Schema.Types.Number, ref: 'address'},
		media: [{
			fileURL: String,
			type: String, // image / video
			default: Boolean,
			desc: String
			
		}],
		licenseNumber: Number,
		licenseExpiry: Date,
		certified: Boolean,
		startTime: String,
		endTime: String,
		holidays: String,
		status: {type: mongoose.Schema.Types.Number, ref: 'status'}, // open / closed
	});
	var stores = mongoose.model('stores', storeSchema);
		storeSchema.plugin(autoIncrement.plugin, 'stores');
		
		app.schema.stores = stores;
};





