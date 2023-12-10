//load express module
const express = require('express');

//load passport used for login - NOT INSTALLED YET
//const passport = require('passport');

//initialize only the Router functionality from express framework
const router = express.Router();

//Require our index controller
//const indexCntrl = require('../controllers/index');

//Routes
//router.get('/', indexCntrl.index);

//routes using passport for Google OAuth below

// OAuth login route - NOT INSTALLED YET
//router.get('/auth/google', passport.authenticate(
// Which passport strategy is being used?
// 'google',
// {
//     // Requesting the user's profile and email
//     scope: ['profile', 'email'],
//     // Optionally force pick account every time
//     // prompt: "select_account"
// }
// ));

// Google OAuth callback route - NOT INSTALLED YET
// router.get('/oauth2callback', passport.authenticate(
// 'google',
// {
//     successRedirect: '/',
//     failureRedirect: '/?m=failed login'
// }
// ));

// OAuth logout route - NOT INSTALLED YET
// router.get('/logout', function(req, res){
//     req.logout(function() {
//       res.redirect('/?m=logged out');
//     });
//   });

//Exports
module.exports = router;