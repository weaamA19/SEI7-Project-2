const Recipes = require('../models/Recipe');

//Define all APIs or Functions

const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//Export the Modules
// module.exports = {
// index: function (req, res) {
//     res.render("home/index", {"title": "Recipe App"});
// },
// };

// This will render the index in home folder as the main folder /
exports.index = (req,res) => {
    Recipes.find()
    .then((recipe) => {
        res.render("home/index", {recipe,dayjs, "title":"Featured Recipes"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All Recipes. Please try again later.");
    })
}