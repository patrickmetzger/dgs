var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;
var bcrypt              = require("bcryptjs");
var SALT_WORK_FACTOR    = 10;

var UserSchema = new Schema({
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

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);