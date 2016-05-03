// app/routes.js
var express     = require('express');
// grab the nerd model we just created
var DGS         = require('./models/nerd');
var User        = require('./models/user');
var CATS        = require('./models/cats');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        
        app.post('/api/authenticate', function(req, res, cb) {
            // find the user
           
            User.findOne({email: req.body.email}, function(err, user) {
                if (err) throw err;

                if (!user) {
                  res.json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {
                    // test a matching password
                    user.comparePassword(req.body.password, function(err, isMatch) {
                        if (err) throw err;
                        res.json({
                          success: true,
                          message: 'Authenciation Successful',
                          date: Date.now()
                        });
                    });                    
                }

            });
        });

        // STARTING USERS
        app.get('/api/users', function(req, res) {
            // use mongoose to get all nerds in the database
            User.find(function(err, users) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all users in JSON format
            });
        });

        app.get('/api/users/:email', function(req, res, next) {
            // use mongoose to get user if one exists
            User.findOne({ email: req.params.email }, function(err, data) {
                if (err) return console.error(err);
                    res.json(data)
            });
        });

        app.post('/api/users', function(req, res) {
            var regPost;
            regPost = new User({
                fName : req.body.fName,
                lName : req.body.lName,
                fullName : req.body.fullName,
                email : req.body.email,
                zipCode : req.body.zipcode,
                url : req.body.url,
                imgThumb : req.body.imgThumb,
                imgFull : req.body.imgFull,
                password : req.body.password
            });
           
            regPost.save(function(err, regPost){
                if(err){ return next(err); }

                res.json(regPost);
            });
        });

        // STARTING CATS
        app.get('/api/cats', function(req, res) {
            // use mongoose to get all CATS in the database
            CATS.find(function(err, CATS) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(CATS); // return all CATS in JSON format
            });
        });

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            DGS.find(function(err, nerds) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };