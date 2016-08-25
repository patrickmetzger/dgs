// server.js

// modules =================================================
var express        	= require('express');
var app            	= express();
var port 			= process.env.PORT || 8080; // set our port
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var flash    		= require('connect-flash');
var morgan       	= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser     	= require('body-parser');
var session      	= require('express-session');
var methodOverride 	= require('method-override');
var config 			= require("./config.json");
var unless 			= require('express-unless');
var crypto 			= require('crypto');
var http 			= require('http');
var busboy      	= require('connect-busboy'); //middleware for form/file upload
var path        	= require('path');     //used for file path
var fs          	= require('fs-extra');       //File System - for file manipulation
var nodemailer 		= require('nodemailer');
var smtpTransport 	= nodemailer.createTransport('smtps://pjmetzger76%40gmail.com:reg2temPJ@smtp.gmail.com');
var User        	= require('./app/models/user');

// configuration ===========================================
var configDB = require('./config/db');    
// config files
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({ type: 'application/json' }));// parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// required for passport
app.use(session({ secret: 'testingthisout' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.use(busboy());
app.use(express.static(path.join('../' + __dirname, 'public')));

app.post('/sendemail',function(req,res){
	var mailOptions = {
	   	to : req.body.to,
		subject : req.body.subject,
	   	html : req.body.html,
	   	text: req.body.text // plaintext body
    }

	smtpTransport.sendMail(mailOptions, function(error, response){
	if(error){
	console.log(error);
	res.end("error");
	}else{
	console.log("Message sent: " + response.message);
	res.end("sent");
	}
	});
});

app.get("/verify/:token", function (req, res, next) {
    var token = req.params.token;

    User.findOne({salt: token}, function (err, doc){
        if (err) return done(err);

        var id = doc._id;
        var updateObj = {verified: true};
        User.findByIdAndUpdate(doc._id, updateObj, function(err, user) {
			if (err) throw err;
			// lets redirect now that we've verified user
			res.redirect('/verify-success');
        });

    })
});

app.route('/api/uploads')
	.post(function (req, res, next) {

	    var fstream;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	        console.log("Uploading: " + filename);

	        //Path where image will be uploaded
	        fstream = fs.createWriteStream(__dirname + '/public/imgs/uploads/' + filename);
	        file.pipe(fstream);
	        fstream.on('close', function () {    
	            console.log("Upload Finished of " + filename);              
	            res.redirect('back');           //where to go next
	        });
	    });
	});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port); 

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
