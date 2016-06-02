var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;

var wLSchema = new Schema({
    userID : {type : String, default: '', required: true},
    itemID : {type : String, default: '', required: true},
});

module.exports = mongoose.model('WishLists', wLSchema);