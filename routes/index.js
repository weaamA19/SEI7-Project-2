//load express module
const express = require('express');

//load passport used for login - NOT INSTALLED YET
const passport = require('passport');

//initialize only the Router functionality from express framework
const router = express.Router();

//Require our index controller
const indexCntrl = require('../controllers/index');

//Routes 
router.get('/', indexCntrl.index);

// Check if the user is logged in - Weaam
const ensureLoggedIn = require('../config/ensureLoggedIn');

//routes using passport for Google authentication - Weaam

// Google OAuth login route - Weaam
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  ));
  

// Google OAuth callback route  - Weaam
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/bid/index', 
      failureRedirect: '/'
    }
  ));
  

// OAuth logout route  - Weaam
router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/');
    });
  });


  

// router.get("/bid", ensureLoggedIn, indexCntrl.index_create_get);  - Weaam
// router.post("/bid", ensureLoggedIn, indexCntrl.index_create_post); - Weaam

//Exports
module.exports = router;