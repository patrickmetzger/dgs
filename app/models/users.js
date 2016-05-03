// app/models/users.js
// grab the mongoose module

var mongoose 			= require('mongoose');
var Schema 				= mongoose.Schema;
var bcrypt 				= require("bcryptjs");
var SALT_WORK_FACTOR 	= 10;


var UsersSchema = new Schema({
	fName : {type : String, default: '', required: true},
    lName : {type : String, default: '', required: true},
    fullName : {type : String, default: '', required: true},
    email : { type: String, required: true, index: { unique: true } },
    zipCode : {type : Number, default: '', required: true},
    url : {type : String, default: ''},
    imgThumb : {type : String, default: ''},
    imgFull : {type : String, default: ''},
    password : {type : String, required: true, default: ''}
});

module.exports = mongoose.model('users', UsersSchema);


/*
var mongoose 			= require('mongoose');
var bcrypt 				= require("bcryptjs");
var SALT_WORK_FACTOR 	= 10;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('users', {
    fName : {type : String, default: '', required: true},
    lName : {type : String, default: '', required: true},
    fullName : {type : String, default: '', required: true},
    email : {type: String, default: '', required: true},
    zipCode : {type : Number, default: '', required: true},
    url : {type : String, default: ''},
    imgThumb : {type : String, default: ''},
    imgFull : {type : String, default: ''},
    password : {type : String, required: true, default: ''}
});
*/