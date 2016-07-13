exports=module.exports = function (app, mongoose) {
	//console.log("Inside ratingSchema");
	var ratingSchema = mongoose.Schema({
		maxRating: Number,
		minRating: Number,
		ratingNumber: Number,
		ratingName: String,
		desc: String
	});
	var ratings = mongoose.model('ratings', ratingSchema);
		ratingSchema.plugin(autoIncrement.plugin, 'ratings');
		
		app.schema.ratings = ratings;
};





