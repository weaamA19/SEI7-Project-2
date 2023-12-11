//Make sure to install the following: 
//npm install express-session
//npm i passport
//npm i passport-google-oauth

const passport = require('passport');
//Setup Google authentication strategy (we had to install the necessary passport)
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//need access to our User model to update
const User = require('../models/User');


// new code below
passport.use(new GoogleStrategy(
  // Configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },

  async function(accessToken, refreshToken, profile, cb) {
    // When using async/await  we use a
    // try/catch block to handle an error
    try {
      // A user has logged in with OAuth...
      let user = await User.findOne({ googleId: profile.id });
      // If user found, so provide it to passport
      if (user){
        console.log("\u001b[1;32mExisting User has logged Successfully.\u001b[0m");
        return cb(null, user);
        }else{
      // We have a new user via OAuth!
        user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      console.log("\u001b[1;46mNew user has logged in with Google OAuth...\u001b[0m");
      return cb(null, user);
    }
    } catch (error) {
      console.log("\u001b[1;31mIssue with Google OAuth...\u001b[0m - " + error);
      return cb(error);
    }
  }
));

//serializeUser() & deserializeUser() Methods used by passport for authentication
passport.serializeUser(function(user, cb) {
cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
cb(null, await User.findById(userId));
});