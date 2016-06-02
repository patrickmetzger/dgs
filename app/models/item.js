var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;

var ItemSchema = new Schema({
    name : {type : String, default: '', required: true},
    shortName : {type : String, default: '', required: true},
    description : {type : String, default: '', required: true},
    price : { type: Number, default: 0, required: true},
    catID : { type: [], required: true},
    imgThumb : {type : String, default: ''},
    imgFull : {type : String, default: ''},
    sellerID : {type : String, default: '', required: true},
    active : {type : String, default: '', required: true},
    location : { type: Number, default: 0, required: true},
    keywords : { type: [], required: true },
    viewed : { type: Number, default: 0, required: true}
});


module.exports = mongoose.model('Item', ItemSchema);