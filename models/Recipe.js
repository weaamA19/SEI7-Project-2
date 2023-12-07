const mongoose = require('mongoose');

//Design the Schema
const recipeSchema = mongoose.Schema({
    thumbnail: String,
    recipeName: String,
    ingredient: String,
    content: String,
    isPublished: Boolean,
    duration: Number,
    // createdAt: Date,
    // updatedAt: Date,
},{
    timestamps: true //this means createdAt and updatedAt (must be separate object)
})

//Creating Model
const Recipes = mongoose.model("Recipe", recipeSchema);


//Exports
module.exports = Recipes;