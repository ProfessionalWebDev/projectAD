exports=module.exports = function (app, mongoose) {
	//console.log("Inside pets schema");
	var petSchema = mongoose.Schema({		
		userId: {type: mongoose.Schema.Types, ref: 'users'},
		name: {type: String, default: ""},
		petType: {type: mongoose.Schema.Types, ref: 'petTypes'},
		breed: {type: mongoose.Schema.Types, ref: 'breeds'},
		height: Number,
		weight: Number,
		dob: Date,
		doa: Date,
		gender: {type: mongoose.Schema.Types.Number, ref: 'generalLists'},
		age: Number,
		desc: String,
		videoURL: String,
		imageURL: String,
		petAdioURL: String,
		ifHandicaped: Boolean,
		handicapedDesc: String,
		ifSurgery: Boolean,
		surgeryDesc: {type: mongoose.Schema.Types.Number, ref: 'surgeriesDiseases'},
		ifDisease: Boolean,
		diseaseDesc: {type: mongoose.Schema.Types.Number, ref: 'surgeriesDiseases'},
		groomingDates: [Date],
		petColor: [{type: mongoose.Schema.Types.Number, ref: 'petColors'}],
		bloodGroup: {type: mongoose.Schema.Types.Number, ref: 'bloodGroups'},
		vacinationConnection: {type: mongoose.Schema.Types.Number, ref: 'vacinationConnections'},
		certified: Boolean,
		dateCreated: {type: Date, default: new Date()},
		lastModified: {type: Date, default: new Date()}
		//heredity
		//uniqueid for microchip
		//menstruation cycle
		//reminder
		//medicines
		//water change and medication (fish)
		//bath date
		
	});
	var pets = mongoose.model('pets', petSchema);
		petSchema.plugin(autoIncrement.plugin, 'pets');
		
		app.schema.pets = pets;
};





