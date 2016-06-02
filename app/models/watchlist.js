var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;

var WLSchema = new Schema({
    userID : {type : String, default: '', required: true},
    itemID : {type : String, default: '', required: true},
});

module.exports = mongoose.model('Watchlist', WLSchema);