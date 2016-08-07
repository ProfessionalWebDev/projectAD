exports = module.exports = function(app, mongoose) {
  var otpSchema = mongoose.Schema({ 
  	"phoneNumber" : {type: String},
	"otpNumber": {type: String, default: ''},
    "expireTime":Date
  });

  var otps = mongoose.model('otps', otpSchema);
  app.schema.otps = otps;
};

