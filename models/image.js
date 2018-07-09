var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    FacebookID: String,
    stage: String,
    imageStr: String
});

module.exports = mongoose.model('image', imageSchema);
