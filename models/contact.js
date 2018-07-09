var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
	FacebookID: String,
    phoneNumber: String,
    stage: String,
    name: String
});



module.exports = mongoose.model('contact', contactSchema);
