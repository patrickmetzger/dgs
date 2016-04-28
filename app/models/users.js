// app/models/users.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('users', {
    fName : {type : String, default: ''},
    lName : {type : String, default: ''},
    fullName : {type : String, default: ''},
    email : {type: String, default: ''},
    zipCode : {type : Number, default: ''},
    url : {type : String, default: ''},
    imgThumb : {type : String, default: ''},
    imgFull : {type : String, default: ''},
});