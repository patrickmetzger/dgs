var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var CatsSchema = new Schema({
	name : {type : String, default: '', required: true},
    active : {type : Boolean, default: 0, required: true},
    imgThumb : {type : String, default: '', required: true},
    shortName : {type : String, default: '', required: true}
});

module.exports = mongoose.model('cats', CatsSchema);