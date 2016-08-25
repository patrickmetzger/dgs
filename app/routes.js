// app/routes.js
var express     = require('express');
var expressJwt     = require('express-jwt');

// grab the nerd model we just created
var DGS         = require('./models/nerd');
var User        = require('./models/user');
var Item        = require('./models/item');
var CATS        = require('./models/cats');
var WishLists    = require('./models/wishlist');
var Watchlist   = require('./models/watchlist');
var passport    = require('passport');
var jwt         = require('jsonwebtoken');
var compose     = require('composable-middleware');
var busboy      = require('connect-busboy'); //middleware for form/file upload
var path        = require('path');     //used for file path
var fs          = require('fs-extra');       //File System - for file manipulation

//var auth        = require('./config/auth.service');
//import * as auth from '../../auth/auth.service';

// Requires controller
//var UserController = require('../config/UserController');
    
module.exports = function(app) {

    var validateJwt = expressJwt({
      secret: 'dgs-secret'
    });

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    function signToken(id, role) {
      return jwt.sign({ _id: id, role: role }, 'dgs-secret', {
        expiresIn: 60 * 60 * 5
      });
    }

    function isAuthenticated() {
        return compose()
            // Validate jwt
            .use(function(req, res, next) {
              // allow access_token to be passed through query parameter as well
              if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
              }
              validateJwt(req, res, next);
            })
            // Attach user to request
            .use(function(req, res, next) {
              User.findById(req.user._id).exec()
                .then(user => {
                  if (!user) {
                    return res.status(401).end();
                  }

                  req.user = user;
                  next();
                })
            });
        }
    
    app.get('/api/userid', isAuthenticated(), function(req, res, next) {
        var userId = req.user._id;
        res.json(userId);
    });

    app.post('/api/authenticate', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) { 
        var error = err || info;
        if(error) {
          return res.status(401).json(error);
        }
        if(!user) {
          return res.status(404).json({message: 'Something went wrong, please try again.'});
        }else{
            if (!user.verified){
                return res.status(404).end();
            }else{
                var token = signToken(user._id, user.role);
            }
        }
        res.json({ token });
      })(req, res, next);
    });

    /*
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
                      _id: user._id,
                      message: 'Authenciation Successful',
                      date: Date.now()
                    });
                });                    
            }

        });
    });*/

    // STARTING USER
    app.get('/api/user', function(req, res) {
        // use mongoose to get all nerds in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.get('/api/user/id/:id', function(req, res, next) {
        // use mongoose to get user if one exists
        User.findById(req.params.id, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.get('/api/user/:email', function(req, res, next) {
        // use mongoose to get user if one exists
        User.findOne({ email: req.params.email }, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.post('/api/user', function(req, res) {
        if (req.body._id){ // were updating
            User.findByIdAndUpdate(req.body._id, req.body, function(err, user) {
              if (err) throw err;

              // we have the updated user returned to us
              console.log(user);
            });
        }else{
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
        }
    });

    // update USER wishlist
    app.post('/api/user/wishlist', function(req, res, next) {
        if (req.body.action == 'delete'){
            User.findByIdAndUpdate(
                req.body.userID,
                {$pull: {wishlist: req.body.itemID}},
                {safe: true, upsert: true},
                function(err, user) {
                    if(err){ return next(err); }
                    console.log('Wishlist item successfully deleted!');
                }
            );
        }else if (req.body.action == 'add'){
            // dup check this itemID
            User.findOne({ _id: req.body.userID }).where('wishlist').eq(req.body.itemID).exec(function(err, data) {
              if (err) throw err;
              if (!data){
                User.findByIdAndUpdate(
                    req.body.userID,
                    {$push: {wishlist: req.body.itemID}},
                    {safe: true, upsert: true},
                    function(err, user) {
                        if(err){ return next(err); }
                        console.log('User successfully updated!');
                    }
                );
              }else{
                return 'Item already exists';
              }
              
            });
        }
        
    });

    app.get('/api/user/wishlist/:userID/:itemID', function(req, res, next) {
        // use mongoose to get watchlist if one exists
        User.findOne({ _id: req.params.userID }).where('wishlist').eq(req.params.itemID).exec(function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    // update USER following
    app.post('/api/user/follow', function(req, res, next) {
        if (req.body.action == 'delete'){
            User.findByIdAndUpdate(
                req.body.userID,
                {$pull: {following: req.body.userID}},
                {safe: true, upsert: true},
                function(err, user) {
                    if(err){ return next(err); }

                    console.log('Follow successfully deleted!');
                }
            );
        }else if (req.body.action == 'add'){
            // dup check this itemID
            User.findOne({ _id: req.body.userID }).where('following').eq(req.body.itemID).exec(function(err, data) {
              if (err) throw err;
              if (!data){
                User.findByIdAndUpdate(
                    req.body.userID,
                    {$push: {following: req.body.itemID}},
                    {safe: true, upsert: true},
                    function(err, user) {
                        if(err){ return next(err); }

                        console.log('Follow added!');
                    }
                );
              }else{
                return 'User ID already exists';
              }
              
            });

            
        }
    });

    app.get('/api/user/follow/:userID/:id', function(req, res, next) {
        // use mongoose to get watchlist if one exists
        User.findOne({ _id: req.params.userID }).where('following').eq(req.params.id).exec(function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.post('/api/wishlist', function(req, res) {

        // dup check this itemID
        User.findOne({ _id: req.body.userID }).where('wishlist').eq(req.body.itemID).exec(function(err, data) {
          if (err) throw err;

          // show the admins in the past month
        });


        /*
        var wlPost;
        wlPost = new WishLists({
            userID : req.body.userID,
            itemID : req.body.itemID
        });
       
        wlPost.save(function(err, wlPost){
            if(err){ return next(err); }

            res.json(wlPost);
        });*/
    });

    // STARTING ITEMS
    app.get('/api/items', function(req, res) {
        // use mongoose to get all items in the database
        Item.find(function(err, Item) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(Item); // return all items in JSON format
        });
    });

    app.get('/api/items/:catID', function(req, res, next) {
        // use mongoose to get item if one exists
        Item.find({ "catID": req.params.catID }, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.get('/api/items/user/:id', function(req, res, next) {
        // use mongoose to get item if one exists
        Item.find({ "sellerID": req.params.id }, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.get('/api/item/:id', function(req, res, next) {
        // use mongoose to get item if one exists    //req.params.id
        Item.findOne({ _id: req.params.id }, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });

    app.post('/api/item', function(req, res) {
        var itemPost;
        itemPost = new Item({
            name : req.body.name,
            shortName : req.body.shortName,
            description : req.body.description,
            price : req.body.price,
            catID : req.body.catID,
            sellerID : req.body.sellerID,
            imgThumb : req.body.imgThumb,
            imgFull : req.body.imgFull,
            active : req.body.active,
            location : req.body.location,
            keywords : req.body.keywords,
            viewed : req.body.viewed
        });
       
        itemPost.save(function(err, itemPost){
            if(err){ return next(err); }

            res.json(itemPost);
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

    app.get('/api/cats/:name', function(req, res, next) {
        // use mongoose to get item if one exists
        CATS.findOne({ shortName: req.params.name }, function(err, data) {
            if (err) return console.error(err);
                res.json(data)
        });
    });
    // END CATS

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