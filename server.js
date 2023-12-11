//File after main installs - by MAZEN
//npm i express mongoose dotenv
//mkdir models controllers routes views public config
//npm i express-ejs-layouts ejs

//Defining dependencies
const express = require('express');

//Load express ejs layout
const expressLayouts = require('express-ejs-layouts');

//initialize express
const app = express();
var path = require("path");

// new code below
var session = require('express-session');
var passport = require('passport');

//require and initialize .env
require('dotenv').config();

//Mouting Session
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

//Mounting Passport
app.use(passport.initialize());
app.use(passport.session());



//define port - this is in the .env file
const port = process.env.PORT;

//Nodejs to look into the folder called views for all the eja files ("view engine" is the key)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Mount express ejs layouts so Nodejs looks for views folder for layout.ejs
app.use(expressLayouts);

/* exception to not use layouts for home index page */

//database configuration
const db = require('./config/db');

// new code below
require('./config/passport');

//Require & import routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
//const auctionRouter = require('./routes/auction');
//const itemRouter = require('./routes/item');
const bidRouter = require('./routes/bid'); //Mazen

//Mount routes
app.use('/', indexRouter);
app.use('/user', userRouter);
//app.use('/auction', auctionRouter);
//app.use('/item', itemRouter);
app.use('/bid', bidRouter); //Mazen

// app.post('/signin', (req, res) => {
//   res.redirect('./routes/index');
// });
// app.use('/signin', userRouter);


//Use public folder
app.use(express.static(path.join(__dirname, "public")));

//below code is used for user object to be available in all views - by MAZEN
// app.use(function (req, res, next) {
//     res.locals.scales = scales;
//     res.locals.user = req.user;
//     next();
//   });

//Console
app.listen(port, () => {
    console.log(`Auction App is running on port \u001b[1;35m${port}\u001b[0m`);
});


