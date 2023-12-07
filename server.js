//Define dependencies
const express = require('express');

//Load express ejs layout
const expressLayouts = require('express-ejs-layouts');

//initialize express
const app = express();
var path = require("path");

//require and initialize .ev
require('dotenv').config();

//define port
const port = process.env.PORT;

//Nodejs to look into the folder called views for all the eja files ("view engine" is the key)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Mount express ejs layouts so Nodejs looks for views folder for layout.ejs
app.use(expressLayouts);

//database configuration
const db = require('./config/db');

//Require & import routes
const indexRouter = require('./routes/index');
const recipeRouter = require('./routes/recipe');
const ingredientRouter = require('./routes/ingredient');

//Mount routes
app.use('/', indexRouter);
app.use('/recipe', recipeRouter);
app.use('/ingredient', ingredientRouter);

//Use public folder
app.use(express.static(path.join(__dirname, "public")));

//Console
app.listen(port, () => {
    console.log(`Recipe App is running on port ${port}`);
});



//use for user object to be available in all views
// app.use(function (req, res, next) {
//     res.locals.scales = scales;
//     next();
//   });