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
app.use(flash());

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
