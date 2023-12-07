const Ingredients = require('../models/Ingredient');

//Define all Ingredient APIs or Functions

//CRUD operations

//HTTP POST - create - Post the data
//HTTP GET - read - Retrieves the data
//HTTP PUT/POST - update - Updates the data
//HTTP DELETE/GET/POST - delete - Deletes the data (for DELETE will need to use method-override)

//require dayjs (after installing)
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//load scales info from config
const scales = require('../config/scales');

//Create Operation
exports.ingredient_create_get = (req, res) => {
    //console.log(scales);
    res.locals.scales = scales;
    res.render("ingredient/add", {"title": "Add New Ingredient"});
}

exports.ingredient_create_post = (req, res) => {
    let ingredient = new Ingredients(req.body);
    // let chkIngredientPublished = req.body.isPublished;

    // if(!chkIngredientPublished){
    //     req.body.

    // }

    console.log(req.body);

    //Save the ingredient
    ingredient.save()
    .then(() => {
        console.log("New Ingredient Added");
        res.redirect("/ingredient/index");
    })
    .catch((error) => {
        console.log("There was an error Adding a new Ingredient: " + error);
        res.send("Please try again later!");
    })
}

exports.ingredient_index_get = (req,res) => {
    Ingredients.find()
    .then((ingredient) => {
        res.render("ingredient/index", {ingredient, dayjs, "title":"Show All Ingredients"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All Ingredients. Please try again later.");
    })
}

exports.ingredient_show_get = (req, res) => {
    
    Ingredients.findById(req.query.id)
    .then((ingredient) => {
        console.log("Returning Ingredient Content: " + ingredient.ingredientName);
        res.render("ingredient/detail", {ingredient,dayjs, "title":"Food Ingredient: " }  )
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show this Ingredient. Please try again later.");
    })
}

exports.ingredient_edit_get = (req, res) => {
    res.locals.scales = scales;
    Ingredients.findById(req.query.id)
    .then((ingredient) => {
        console.log("Editing Ingredient: " + ingredient.ingredientName);
        res.render("ingredient/edit", {ingredient, "title":"Edit Ingredient" }  )
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show Ingredient to Edit. Please try again later.");
    })
}

exports.ingredient_update_post = (req, res) => {
    console.log("Updating Ingredient: " + req.body.ingredientName);
    Ingredients.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        console.log("Updated Ingredient: " + req.body.ingredientName);
        res.redirect("/ingredient/index");
    })
    .catch((error) => {
        console.log("There was an error in updating Ingredient: " + error);
        res.send("Cannot Update Ingredient. Please try again later.");
    })
}

exports.ingredient_delete_post = (req,res) => {
    console.log("Deleting Ingredient with ID: "  + req.query.id); 
    Ingredients.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/ingredient/index');
    })
    .catch((error) => {
        console.log("There was an error deleting: " + error);
        res.send("Cannot Delete Ingredient. Please try again later.");
    })
}