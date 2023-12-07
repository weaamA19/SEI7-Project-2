const Recipes = require('../models/Recipe');

//Define all Recipe APIs or Functions

//CRUD operations

//HTTP POST - create - Post the data
//HTTP GET - read - Retrieves the data
//HTTP PUT/POST - update - Updates the data
//HTTP DELETE/GET/POST - delete - Deletes the data (for DELETE will need to use method-override)

//require dayjs (after installing)
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//Create Operation
exports.recipe_create_get = (req, res) => {
    res.render("recipe/add", {"title": "Add New Recipe"});
}

exports.recipe_create_post = (req, res) => {
    let recipe = new Recipes(req.body);
    // let chkRecipePublished = req.body.isPublished;

    // if(!chkRecipePublished){
    //     req.body.

    // }

    console.log(req.body);

    //Save the recipe
    recipe.save()
    .then(() => {
        console.log("New Recipe Added");
        res.redirect("/recipe/index");
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Please try again later!");
    })
}

exports.recipe_index_get = (req,res) => {
    Recipes.find()
    .then((recipe) => {
        res.render("recipe/index", {recipe, dayjs, "title":"Show All Recipes"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All Recipes. Please try again later.");
    })
}

exports.recipe_show_get = (req, res) => {
    
    Recipes.findById(req.query.id)
    .then((recipe) => {
        console.log("Returning Recipe Content: " + recipe.recipeName);
        res.render("recipe/detail", {recipe,dayjs, "title":"How to make: " }  )
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show this Recipe. Please try again later.");
    })
}

exports.recipe_edit_get = (req, res) => {
    
    Recipes.findById(req.query.id)
    .then((recipe) => {
        console.log("Editing Recipe: " + recipe.recipeName);
        res.render("recipe/edit", {recipe, "title":"Edit Recipe" }  )
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show Recipe to Edit. Please try again later.");
    })
}

exports.recipe_update_post = (req, res) => {
    console.log("Updating Recipe: " + req.body.recipeName);
    Recipes.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        console.log("Updated Recipe: " + req.body.recipeName);
        res.redirect("/recipe/index");
    })
    .catch((error) => {
        console.log("There was an error in updating Recipe: " + error);
        res.send("Cannot Update Recipe. Please try again later.");
    })
}

exports.recipe_delete_post = (req,res) => {
    console.log("Deleting Recipe with ID: "  + req.query.id); 
    Recipes.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/recipe/index');
    })
    .catch((error) => {
        console.log("There was an error deleting: " + error);
        res.send("Cannot Delete Recipe. Please try again later.");
    })
}