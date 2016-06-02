// app/routes.js
var express     = require('express');
// grab the nerd model we just created
var DGS         = require('./models/nerd');
var User        = require('./models/user');
var Item        = require('./models/item');
var CATS        = require('./models/cats');
var WishLists    = require('./models/wishlist');
var Watchlist   = require('./models/watchlist');

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
                          _id: user._id,
                          message: 'Authenciation Successful',
                          date: Date.now()
                        });
                    });                    
                }

            });
        });

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

        app.get('/api/user/:id', function(req, res, next) {
            // use mongoose to get user if one exists
            User.findOne({ _id: req.params.id }, function(err, data) {
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

        // update USER
        app.post('/api/user/wishlist', function(req, res, next) {
            console.log(req.body);
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
                    console.log(data);
                    res.json(data)
            });
        });

        app.post('/api/wishlist', function(req, res) {

            // dup check this itemID
            User.findOne({ _id: req.body.userID }).where('wishlist').eq(req.body.itemID).exec(function(err, data) {
              if (err) throw err;

              // show the admins in the past month
              console.log(users);
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

        app.get('/api/cat/:name', function(req, res, next) {
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